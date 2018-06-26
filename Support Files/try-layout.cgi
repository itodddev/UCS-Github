#!/usr/bin/perl

use LWP;
use CGI;
use XML::LibXML;
use XML::Simple;
use XML::Parser;
use XML::Writer;
use Data::Dumper;
use IO::Socket;
use Sys::Hostname;
use List::Util qw[min max];

require "cgi-lib.pl";

# Declare the subs...
sub doCfgStrElem;
sub doCreateXml;
sub doPostXml;

sub doFormHelp;
sub doFormChassis;
sub doFormSystem;
sub doFormLayout;

# Global Vars and Arrays
my $mAddr = inet_ntoa((gethostbyname(hostname))[4]);
my $mHost = hostname;
my $mUri;
my $mHttp = LWP::UserAgent->new;

my $mSeqPict;
my $mSubmit;
my $mPrvPage;
my $mCurPage;
my $mRckMode;
my $mCurChas;

my $mCfgUFab;
my $mCfgSyst;
my @aCfgChas = ();

# sub max ($$) { $_[$_[0] < $_[1]] }
# sub min ($$) { $_[$_[0] > $_[1]] }

MAIN:
{
  # url for the xml-api
  $mUri = "http://ucs4.us/ucs/layout-api/layout-api.cgi";

  # read in all the variables set by the form
  &ReadParse(*input);
  print &PrintHeader;

  # grab the config from hidden fields
  $mSeqPict = $input{"seq"};
  $mPrvPage = $input{"prv"};
  $mCurPage = $input{"pag"};
  $mCurChas = $input{"chs"};
  $mRckMode = $input{"mod"};
  $mCfgUFab = $input{"fab"};
  $mCfgSyst = $input{"sys"};

  $aCfgChas[1] = $input{"ch1"};
  $aCfgChas[2] = $input{"ch2"};
  $aCfgChas[3] = $input{"ch3"};

  $mSubmit = $input{"submit"};

  # where were we

  if ($mCurPage eq "") {
    $mRckMode = "auto";
    $mSeqPict = substr("000" . int(rand(1000)), -3) . "0";
    $mCfgUFab = "0|N|0|N|N|2|N|0|N|N|N|0|4"; # fi's, exp mods, iom
    $mCfgSyst = "F|P|S";   # face, format, size
    $aCfgChas[1] = "1|4"; # qty, psu's
    for $j (1 .. $mBladeTypes) {
      $aCfgChas[1] .= "|0"; # blades
    }
    for $i (2 .. $mMaxChas) {
      $aCfgChas[$i] = "0|4"; # qty, psu's
      for $j (1 .. $mBladeTypes) {
        $aCfgChas[$i] .= "|0"; # blades
      }
    }
    $mCurChas = 1;
  }

  elsif ($mCurPage eq "chassis") {
    $aCfgChas[$mCurChas] = $input{"qtty"} . "|" . $input{"psus"} . "|" .
                           $input{"b022"} . "|" . $input{"b203"} . "|" . $input{"b204"} . "|" . 
                           $input{"b252"};
  }

  elsif ($mCurPage eq "system") {
    $fint = $input{"fint"};
    if ($fint == 0) {
      $mNr6120 = 0;
      $mNr6140 = 0;
    }
    elsif ($fint <= 2) {
      $mNr6120 = $fint;
      $mNr6140 = 0;
    }
    elsif ($fint <= 4) {
      $mNr6120 = 0;
      $mNr6140 = $fint - 2;
    }

    $mExp1 = "N";
    if ($input{"exp1"} eq "6x 10GbE") {
      $mExp1 = "E";
    }
    elsif ($input{"exp1"} eq "8x 4Gb FC") {
      $mExp1 = "4";
    }
    elsif ($input{"exp1"} eq "6x 8Gb FC") {
      $mExp1 = "8";
    }
    elsif ($input{"exp1"} eq "4x 10G 4x FC") {
      $mExp1 = "C";
    }
    $mExp2 = "N";
    if ($input{"exp2"} eq "6x 10GbE") {
      $mExp2 = "E";
    }
    elsif ($input{"exp2"} eq "8x 4Gb FC") {
      $mExp2 = "4";
    }
    elsif ($input{"exp2"} eq "6x 8Gb FC") {
      $mExp2 = "8";
    }
    elsif ($input{"exp2"} eq "4x 10G 4x FC") {
      $mExp2 = "C";
    }
    $mExp3 = "N";
    if ($input{"exp3"} eq "6x 10GbE") {
      $mExp3 = "E";
    }
    elsif ($input{"exp3"} eq "8x 4Gb FC") {
      $mExp3 = "4";
    }
    elsif ($input{"exp3"} eq "6x 8Gb FC") {
      $mExp3 = "8";
    }
    elsif ($input{"exp3"} eq "4x 10G 4x FC") {
      $mExp3 = "C";
    }

    $mIOmd = "4";
    if ($input{"iomd"} eq "8") {
      $mIOmd = "8";
    }
    elsif ($input{"iomd"} eq "1") {
      $mIOmd = "1";
    }

    $mNrFabInt = $mNr6120 + $mNr6140;
    $mNrFabExt = $mNrFabInt;
    $mCfgUFab = $mNr6120 . "|" . $mExp1 . "|" . $mNr6140 . "|" . $mExp2 . "|" . $mExp3 . "|" . $mIOmd;

    $mCfgSyst = $input{"face"} . "|" . $input{"frmt"} . "|" . $input{"size"};
  }

  # where do we go
  if ($mSubmit eq "") {
    $mCurChas = 1;
    &doFormChassis();
  }

  # submit buttons on chassis form
  elsif ($mCurPage eq "chassis") {
    if ($mSubmit eq "Next") {
      $mCurChas += 1;
      if ($mCurChas > 9) { $mCurChas = 9; }
      &doFormChassis();
    }
    elsif ($mSubmit eq "Prev") {
      $mCurChas -= 1;
      if ($mCurChas < 1) { $mCurChas = 1; }
      &doFormChassis();
    }
    elsif ($mSubmit eq "Continue") {
      &doFormSystem();
    }
  }

  # submit buttons on system form
  elsif ($mCurPage eq "system") {
    if ($mSubmit eq "Layout") {
      $mSeqPict++;
      &doFormLayout();
    }
  }

  # submit buttons on layout form
  elsif ($mCurPage eq "layout") {
    if ($mSubmit eq "Restart") {
      $mSeqPict = substr("000" . int(rand(1000)), -3) . "0";
      $mCfgUFab = "2|N|0|N|N|0|4"; # fi's, exp mods, iom
      $mCfgSyst = "F|P|S"; # face, format, size
      $aCfgChas[1] = "1|4"; # qty, psu's
      for $j (1 .. $mBladeTypes) {
        $aCfgChas[1] .= "|0"; # blades
      }
      for $i (2 .. $mMaxChas) {
        $aCfgChas[$i] = "0|4"; # qty, psu's
        for $j (1 .. $mBladeTypes) {
          $aCfgChas[$i] .= "|0"; # blades
        }
      }
      $mCurChas = 1;
      $mRckMode = "auto";
      &doFormChassis();
    }
    elsif ($mSubmit eq "Return") {
      &doFormChassis();
    }
    elsif ($mSubmit eq "Back") {
      &doFormSystem();
    }
  }

  exit;
}

########################################################################

sub doCfgStrElem
{
  my ($cfgStr, $el) = @_;

  @elem = split(/\|/, $cfgStr);

  return $elem[$el - 1];
}

########################################################################
#
# create XML config
#

sub doCreateXml
{
  my $mXmlReq;

  my $mXmlHdr;
  my $mXmlFtr;
  my $mXmlFIs;
  my $mXmlChs;
  my $mXmlPar;
  my $mXmlTop;
  my @aXmlRck = ();

  my $mNr6120 = &doCfgStrElem($mCfgUFab, 1);
  my $mNr6140 = &doCfgStrElem($mCfgUFab, 3);
  my $mNrFabInt = $mNr6120 + $mNr6140;
  my $mNrFabExt = $mNrFabInt; # per server rack
  my $mExp1 = &doCfgStrElem($mCfgUFab, 2);
  my $mExp2 = &doCfgStrElem($mCfgUFab, 4);
  my $mExp3 = &doCfgStrElem($mCfgUFab, 5);

  my $mRckFace = &doCfgStrElem($mCfgSyst, 1);
  my $mImgFrmt = &doCfgStrElem($mCfgSyst, 2);
  my $mImgSize = &doCfgStrElem($mCfgSyst, 3);

  my $mNrChassis = 0;

  for $ch (1 .. $mMaxChas) {
    $mNrChassis += &doCfgStrElem($aCfgChas[$ch], 1);
  }

  my $mNrRacks;
  my $mFabRack;
  my @aChasPerRack = ();
  my @aSrvRUinRack = ();

  $mXmlHdr =			'<?xml version="1.0" encoding="UTF-8"?>' .
				'<layout mode="auto" seq="' . $mSeqPict . '">';
  $mXmlFtr =			'</layout>';

  if ($mRckMode eq "auto")
  {
    # fabric interconnects
    $mXmlFIs = 			'';
    if ($mNr6120 > 0) {
      $mXmlFIs .= 		'    <fabint model="FI6120" qty="' . $mNr6120 . '">';
      if ($mExp1 eq "E") {
        $mXmlFIs .= 		'        <expmod model="E0600" qty="1" />';
      }
      elsif ($mExp1 eq "4") {
        $mXmlFIs .= 		'        <expmod model="E0080" qty="1" />';
      }
      elsif ($mExp1 eq "8") {
        $mXmlFIs .= 		'        <expmod model="E0060" qty="1" />';
      }
      elsif ($mExp1 eq "C") {
        $mXmlFIs .= 		'        <expmod model="E0440" qty="1" />';
      }
      $mXmlFIs .= 		'        <power qty="2" />';
      $mXmlFIs .= 		'    </fabint>';
    }

    elsif ($mNr6140 > 0) {
      $mXmlFIs .= 		'    <fabint model="FI6140" qty="' . $mNr6140 . '">';
      if (($mExp2 eq "E") && ($mExp3 eq "E")) {
        $mXmlFIs .= 		'        <expmod model="E0600" qty="2" />';
      }
      elsif (($mExp2 eq "4") && ($mExp3 eq "4")) {
        $mXmlFIs .= 		'        <expmod model="E0080" qty="2" />';
      }
      elsif (($mExp2 eq "8") && ($mExp3 eq "8")) {
        $mXmlFIs .= 		'        <expmod model="E0060" qty="2" />';
      }
      elsif (($mExp2 eq "C") && ($mExp3 eq "C")) {
        $mXmlFIs .= 		'        <expmod model="E0440" qty="2" />';
      }
      else {
        if ($mExp2 eq "E") {
          $mXmlFIs .= 		'        <expmod model="E0600" qty="1" />';
        }
        elsif ($mExp2 eq "4") {
          $mXmlFIs .= 		'        <expmod model="E0080" qty="1" />';
        }
        elsif ($mExp2 eq "8") {
          $mXmlFIs .= 		'        <expmod model="E0060" qty="1" />';
        }
        elsif ($mExp2 eq "C") {
          $mXmlFIs .= 		'        <expmod model="E0440" qty="1" />';
        }
        if ($mExp3 eq "E") {
          $mXmlFIs .= 		'        <expmod model="E0600" qty="1" />';
        }
        elsif ($mExp3 eq "4") {
          $mXmlFIs .= 		'        <expmod model="E0080" qty="1" />';
        }
        elsif ($mExp3 eq "8") {
          $mXmlFIs .= 		'        <expmod model="E0060" qty="1" />';
        }
        elsif ($mExp3 eq "C") {
          $mXmlFIs .= 		'        <expmod model="E0440" qty="1" />';
        }
      }
      $mXmlFIs .= 		'        <power qty="2" />';
      $mXmlFIs .= 		'    </fabint>';
    }

    # blade chassis
    $mXmlChs =			'';
    for $ch (1 .. $mMaxChas) {
      $nrCh = &doCfgStrElem($aCfgChas[$ch], 1);
      $nrBl = 0;
      for $b (1 .. $mBladeTypes) {
        $nrBl += &doCfgStrElem($aCfgChas[$ch], 2 + $b);
      }

      if (($nrCh > 0) || ($nrBl > 0)) {
        $mXmlChs .=		'    <chassis model="UCS5108" cfg="' . $ch . '" qty="' . $nrCh . '">';
        $nrPSUs = &doCfgStrElem($aCfgChas[$ch], 2);
        $nrB022 = &doCfgStrElem($aCfgChas[$ch], 3);
        $nrB203 = &doCfgStrElem($aCfgChas[$ch], 4);
        $nrB204 = &doCfgStrElem($aCfgChas[$ch], 5);
        $nrB252 = &doCfgStrElem($aCfgChas[$ch], 6);

        if ($nrB022 > 0) {
          $mXmlChs .=		'        <blade model="B022" qty="' . $nrB022 . '" />';
        }
        if ($nrB203 > 0) {
          $mXmlChs .=		'        <blade model="B203" qty="' . $nrB203 . '" />';
        }
        if ($nrB204 > 0) {
          $mXmlChs .=		'        <blade model="B204" qty="' . $nrB204 . '" />';
        }
        if ($nrB252 > 0) {
          $mXmlChs .=		'        <blade model="B252" qty="' . $nrB252 . '" />';
        }

        if ($mIOmd eq "1") {
          $mXmlChs .=		'        <iomod model="IOM2104" qty="' . $mNrFabInt . '" />';
        }
        elsif ($mIOmd eq "4") {
          $mXmlChs .=		'        <iomod model="IOM2204" qty="' . $mNrFabInt . '" />';
        }
        elsif ($mIOmd eq "8") {
          $mXmlChs .=		'        <iomod model="IOM2208" qty="' . $mNrFabInt . '" />';
        }

        $mXmlChs .=		'        <power qty="' . $nrPSUs . '" />';
        $mXmlChs .=		'    </chassis>';
      } # end if
    } # end for

    # parameters
    $mXmlPar =			'';
    $mXmlPar .=			'    <params';
    if ($mRckFace eq "F") {
      $mXmlPar .=		' face="front"';
    }
    elsif ($mRckFace eq "R") {
      $mXmlPar .=		' face="rear"';
    }
    elsif ($mRckFace eq "P") {
      $mXmlPar .=		' face="perspective"';
    }
    if ($mImgFrmt eq "P") {
      $mXmlPar .=		' format="photo"';
    }
    elsif ($mImgFrmt eq "D") {
      $mXmlPar .=		' format="drawing"';
    }
    elsif ($mImgFrmt eq "O") {
      $mXmlPar .=		' format="overlay"';
    }
    if ($mImgSize eq "S") {
      $mXmlPar .=		' size="small"';
    }
    elsif ($mImgSize eq "M") {
      $mXmlPar .=		' size="medium"';
    }
    elsif ($mImgSize eq "L") {
      $mXmlPar .=		' size="large"';
    }
    $mXmlPar .=			' />';
  } # end auto mode

  # compose the request
  $mXmlReq = $mXmlHdr . $mXmlFIs . $mXmlChs . $mXmlPar . $mXmlFtr;

  return $mXmlReq;
}

##########################################################################

#
# Send the XML request to the Web Server
#
sub doPostXml
{
    my ($uri, $req) = @_;

    if (!$mHttp) {
        $mHttp = LWP::UserAgent->new();
    }
    my $request = HTTP::Request->new(POST => $uri);
#   $request->content_type("application/x-www-form-urlencoded");
    $request->content_type("text/xml");
    $request->content($req);
    # print("\nRequest: \n" . $request->as_string() . "<br>\n");
    my $resp = $mHttp->request($request);    # HTTP::Response object
    # print("\nResponse: \n" . $resp->as_string() . "<br>\n");
    # print("\nContent: \n" . $resp->content . "<br>\n");
    # print("\nLocation: \n" . $resp->header("Location") . "<br>\n");
    # print("\nStatus: \n" . $resp->status_line . "<br>\n");
    # print("\nSuccess: \n" . $resp->is_success . "<br>\n");
    return ($resp->content, $resp->header("Location"), $resp->status_line, $resp->is_success) if wantarray;
    return unless $resp->is_success;
    return $resp->content;
}

########################################################################

sub doFormChassis
{
  my @qtty = ();
  my @psus = ();
  my @b022 = ();
  my @b203 = ();
  my @b204 = ();
  my @b252 = ();

  $qtty[&doCfgStrElem($aCfgChas[$mCurChas], 1)] = " selected";
  $psus[&doCfgStrElem($aCfgChas[$mCurChas], 2)] = " checked";
  $b022[&doCfgStrElem($aCfgChas[$mCurChas], 3)] = " checked";
  $b203[&doCfgStrElem($aCfgChas[$mCurChas], 4)] = " checked";
  $b204[&doCfgStrElem($aCfgChas[$mCurChas], 5)] = " checked";
  $b252[&doCfgStrElem($aCfgChas[$mCurChas], 6)] = " checked";
 
  $mLowChas = 1;
  for ($i = 1; $i < $mCurChas; $i++) {
    $mLowChas += &doCfgStrElem($aCfgChas[$i], 1);
  }
  $mHghChas = $mLowChas - 1 + &doCfgStrElem($aCfgChas[$mCurChas], 1);
  $mTitle = "config " . $mCurChas;
  if ($mHghChas >= $mLowChas) {
    $mTitle = $mTitle . " &nbsp;&ndash;&nbsp; chassis " . $mLowChas;
  }
  if ($mHghChas > $mLowChas) {
    $mTitle = $mTitle . "-" . $mHghChas;
  }

  # print the page
  print <<EOT;
<html>
<head>
<title>Cisco UCS Layout</title>
</head>
<body>

<p><br>
<h2><center>Cisco UCS Layout</center></h2>
<p>
<hr>
<p>
<form method="post" action="/ucs/layout/ucs-layout.cgi">
<input type="hidden" name="seq" value="$mSeqPict"></input></td>
<input type="hidden" name="prv" value=""></input></td>
<input type="hidden" name="pag" value="chassis"></input></td>
<input type="hidden" name="fab" value="$mCfgUFab"></input></td>
<input type="hidden" name="sys" value="$mCfgSyst"></input></td>
<input type="hidden" name="mod" value="$mRckMode"></input></td>
<input type="hidden" name="chs" value="$mCurChas"></input></td>
<input type="hidden" name="ch1" value="$aCfgChas[1]"></input></td>
<input type="hidden" name="ch2" value="$aCfgChas[2]"></input></td>
<input type="hidden" name="ch3" value="$aCfgChas[3]"></input></td>
<table cellpadding="0" cellspacing="0" width="100%" border="0">
<tr><td align="right">
<input type="submit" name="submit" value="Help"></input>
</td></tr>
</table>
<h2><center>$mTitle</center></h2>
<p>
<center>
<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="right">&nbsp;</td>
<td align="center" width="60">0</td>
<td align="center" width="60">1</td>
<td align="center" width="60">2</td>
<td align="center" width="60">3</td>
<td align="center" width="60">4</td>
<td align="center" width="60">5</td>
<td align="center" width="60">6</td>
<td align="center" width="60">7</td>
<td align="center" width="60">8</td>
</tr><tr>
<td align="right">&nbsp;</td>
EOT

  if (0) {
    print <<EOT;
</tr><tr>
<td align="right">B22-M3 :&nbsp;&nbsp;</td>
<td align="center" width="60"><input type="radio" name="b022" value="0"$b022[0]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="1"$b022[1]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="2"$b022[2]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="3"$b022[3]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="4"$b022[4]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="5"$b022[5]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="6"$b022[6]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="7"$b022[7]></input></td>
<td align="center" width="60"><input type="radio" name="b022" value="8"$b022[8]></input></td>
EOT
  }

  print <<EOT;
</tr><tr>
<td align="right">&nbsp;</td>
</tr><tr>
<td align="right">B200-M3 :&nbsp;&nbsp;</td>
<td align="center" width="60"><input type="radio" name="b203" value="0"$b203[0]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="1"$b203[1]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="2"$b203[2]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="3"$b203[3]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="4"$b203[4]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="5"$b203[5]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="6"$b203[6]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="7"$b203[7]></input></td>
<td align="center" width="60"><input type="radio" name="b203" value="8"$b203[8]></input></td>
</tr><tr>
<td align="right">B200-M4 :&nbsp;&nbsp;</td>
<td align="center" width="60"><input type="radio" name="b204" value="0"$b204[0]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="1"$b204[1]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="2"$b204[2]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="3"$b204[3]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="4"$b204[4]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="5"$b204[5]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="6"$b204[6]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="7"$b204[7]></input></td>
<td align="center" width="60"><input type="radio" name="b204" value="8"$b204[8]></input></td>
</tr><tr>
<td align="right">B250-M2 :&nbsp;&nbsp;</td>
<td align="center" width="60"><input type="radio" name="b252" value="0"$b252[0]></input></td>
<td align="center" width="60"><input type="radio" name="b252" value="1"$b252[1]></input></td>
<td align="center" width="60"><input type="radio" name="b252" value="2"$b252[2]></input></td>
<td align="center" width="60"><input type="radio" name="b252" value="3"$b252[3]></input></td>
<td align="center" width="60"><input type="radio" name="b252" value="4"$b252[4]></input></td>
</tr><tr>
<td align="right">&nbsp;</td>
</tr><tr>
<td align="right">PSUs :&nbsp;&nbsp;</td>
<td align="center" width="60"><input type="radio" name="psus" value="0"$psus[0]></input></td>
<td align="center" width="60"><input type="radio" name="psus" value="1"$psus[1]></input></td>
<td align="center" width="60"><input type="radio" name="psus" value="2"$psus[2]></input></td>
<td align="center" width="60"><input type="radio" name="psus" value="3"$psus[3]></input></td>
<td align="center" width="60"><input type="radio" name="psus" value="4"$psus[4]></input></td>
</tr><tr>
<td align="right">&nbsp;</td>
</tr><tr>
<td align="right">quantity :&nbsp;&nbsp;</td>
<td align="left" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<select name="qtty">
<option$qtty[0]>0
<option$qtty[1]>1
<option$qtty[2]>2
<option$qtty[3]>3
</select>
</td>
</tr>
</table>
<p><br>
<input type="submit" name="submit" value="Prev"></input>&nbsp;&nbsp;
<input type="submit" name="submit" value="Next"></input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="submit" name="submit" value="Continue"></input>
</center>
</form>
<p><br>
<p>
<hr>
<p><br>
</body>
</html>
EOT

}

########################################################################

sub doFormSystem
{
  my @aFInt = ();
  my @aExp1 = ();
  my @aExp2 = ();
  my @aExp3 = ();
  my @aIOmd = ();
  my @aFace = ();
  my @aFrmt = ();
  my @aSize = ();

  $mNr6120 = &doCfgStrElem($mCfgUFab, 1);
  $mNr6140 = &doCfgStrElem($mCfgUFab, 3);

  if (($mNr6120 + $mNr6140) == 0) {
    $aFInt[0] = " checked";
  }
  elsif ($mNr6120 > 0) {
    $aFInt[$mNr6120] = " checked";
  }
  elsif ($mNr6140 > 0) {
    $aFInt[3 + $mNr6140] = " checked";
  }

  $e1 = &doCfgStrElem($mCfgUFab, 2);
  $aExp1[index("NE48C", $e1)] = " selected";
  $e2 = &doCfgStrElem($mCfgUFab, 4);
  $aExp2[index("NE48C", $e2)] = " selected";
  $e3 = &doCfgStrElem($mCfgUFab, 5);
  $aExp3[index("NE48C", $e3)] = " selected";

  $io = &doCfgStrElem($mCfgUFab, 6);
  $aIOmd[index("148", $io) + 1] = " checked";

  $fr = &doCfgStrElem($mCfgSyst, 1);
  $aFace[index("FRP", $fr) + 1] = " checked";
  $fm = &doCfgStrElem($mCfgSyst, 2);
  $aFrmt[index("PDO", $fm) + 1] = " checked";
  $sz = &doCfgStrElem($mCfgSyst, 3);
  $aSize[index("SMLX", $sz) + 1] = " checked";

  $mLowChas = 1;
  $mHghChas = 0;
  for $i (1 .. $mMaxChas) {
    $mHghChas += &doCfgStrElem($aCfgChas[$i], 1);
  }

  if ($mHghChas >= $mLowChas) {
    $mHghChas = "- " . $mHghChas;
  }
  else {
    $mHghChas = "";
  }

  # print the page
  print <<EOT;
<html>
<head>
<title>Cisco UCS Layout</title>
</head>
<body>

<p><br>
<h2><center>Cisco UCS Layout</center></h2>
<p>
<hr>
<p>
<form method="post" action="/ucs/layout/ucs-layout.cgi">
<input type="hidden" name="seq" value="$mSeqPict"></input></td>
<input type="hidden" name="prv" value=""></input></td>
<input type="hidden" name="pag" value="system"></input></td>
<input type="hidden" name="fab" value="$mCfgUFab"></input></td>
<input type="hidden" name="sys" value="$mCfgSyst"></input></td>
<input type="hidden" name="mod" value="$mRckMode"></input></td>
<input type="hidden" name="chs" value="$mCurChas"></input></td>
<input type="hidden" name="ch1" value="$aCfgChas[1]"></input></td>
<input type="hidden" name="ch2" value="$aCfgChas[2]"></input></td>
<input type="hidden" name="ch3" value="$aCfgChas[3]"></input></td>
<table cellpadding="0" cellspacing="0" width="100%" border="0">
<tr><td align="right">
<input type="submit" name="submit" value="Help"></input>
</td></tr>
</table>
<!--
<h2><center>chassis $mLowChas $mHghChas</center></h2>
-->
<h2><center>infrastructure options</center></h2>
<p>
<center>
<table cellpadding="1" cellspacing="0" border="0">
<tr>
<td align="right">&nbsp;</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" width="60">&nbsp;0</td>
<td align="left" width="60">&nbsp;1</td>
<td align="left" width="60">&nbsp;2</td>
<td align="left" width="60">&nbsp;</td>
<td align="left" width="60">&nbsp;</td>
<td align="left" width="60">&nbsp;</td>
<td align="left" width="60">&nbsp;</td>
<td align="left" width="60">&nbsp;</td>
<td align="left" width="60">&nbsp;</td>
<td align="left" width="30">&nbsp;</td>
</tr><tr>
<td align="right">FI 6120 :</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" width="60"><input type="radio" name="fint" value="0"$aFInt[0]></input></td>
<td align="left" width="60"><input type="radio" name="fint" value="1"$aFInt[1]></input></td>
<td align="left" width="60"><input type="radio" name="fint" value="2"$aFInt[2]></input></td>
<td align="left" colspan="2">&nbsp;<select name="exp1">
<option$aExp1[0]>no module &nbsp;&nbsp;&nbsp;
<option$aExp1[1]>6x 10GbE
<option$aExp1[2]>8x 4Gb FC
<option$aExp1[3]>6x 8Gb FC
<option$aExp1[4]>4x 10G 4x FC
</select></td>
</tr><tr>
<td align="right">FI 6140 :</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" width="60"><input type="radio" name="fint" value="0"$aFInt[3]></input></td>
<td align="left" width="60"><input type="radio" name="fint" value="3"$aFInt[4]></input></td>
<td align="left" width="60"><input type="radio" name="fint" value="4"$aFInt[5]></input></td>
<td align="left" colspan="2">&nbsp;<select name="exp2">
<option$aExp2[0]>no module &nbsp;&nbsp;&nbsp;
<option$aExp2[1]>6x 10GbE
<option$aExp2[2]>8x 4Gb FC
<option$aExp2[3]>6x 8Gb FC
<option$aExp2[4]>4x 10G 4x FC
</select>
</td>
<td align="left" colspan="2">&nbsp;<select name="exp3">
<option$aExp3[0]>no module &nbsp;&nbsp;&nbsp;
<option$aExp3[1]>6x 10GbE
<option$aExp3[2]>8x 4Gb FC
<option$aExp3[3]>6x 8Gb FC
<option$aExp3[4]>4x 10G 4x FC
</select>
</td>
</tr><tr>
<td align="center" colspan="1">&nbsp;</td>
</tr><tr>
<td align="right">IO module :</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="iomd" value="1"$aIOmd[1]></input>&nbsp;2104&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="iomd" value="4"$aIOmd[2]></input>&nbsp;2204&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="iomd" value="8"$aIOmd[3]></input>&nbsp;2208&nbsp;</td>
</tr><tr>
<td align="right">&nbsp;</td>
</tr><tr>
<td align="center" colspan="1">&nbsp;</td>
</tr><tr>
<td align="right">rack face :</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="face" value="F"$aFace[1]></input>&nbsp;Front&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="face" value="R"$aFace[2]></input>&nbsp;Rear&nbsp;</td>
<td align="left" colspan="3"><input type="radio" name="face" value="P"$aFace[3]></input>&nbsp;Perspective&nbsp;</td>
</tr><tr>
<td align="right">format :</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="frmt" value="P"$aFrmt[1]></input>&nbsp;Photo</td>
<td align="left" colspan="2"><input type="radio" name="frmt" value="D"$aFrmt[2]></input>&nbsp;Drawing</td>
<td align="left" colspan="2"><input type="radio" name="frmt" value="O"$aFrmt[3]></input>&nbsp;Overlay</td>
</tr><tr>
<td align="right">image size :</td>
<td align="left" width="20">&nbsp;</td>
<td align="left" colspan="2"><input type="radio" name="size" value="S"$aSize[1]></input>&nbsp;Small</td>
<td align="left" colspan="2"><input type="radio" name="size" value="M"$aSize[2]></input>&nbsp;Medium</td>
<td align="left" colspan="2"><input type="radio" name="size" value="L"$aSize[3]></input>&nbsp;Large</td>
</tr><tr>
<td align="center" colspan="1">&nbsp;</td>
</tr>
</table>
<p><br>
<input type="submit" name="submit" value="Back"></input>&nbsp;&nbsp;
<input type="submit" name="submit" value="Layout"></input>
</center>
</form>
<p><br>
<p>
<hr>
<p><br>
</body>
</html>
EOT

}

########################################################################
#
# layout UCS system
#

sub doFormLayout 
{
  my $mXmlReq = &doCreateXml();

  
  my ($mXmlRsp, $mLocation, $mMessage, $mSuccess) = &doPostXml($mUri, $mXmlReq);

  # print the page
  print <<EOT;
<html>
<head>
<title>Cisco UCS Layout</title>
</head>
<body>

<p><br>
<h2><center>Cisco UCS Layout</center></h2>
<p>
<hr>
<p>
<form method="post" action="/ucs/layout/ucs-layout.cgi">
<input type="hidden" name="seq" value="$mSeqPict"></input></td>
<input type="hidden" name="prv" value=""></input></td>
<input type="hidden" name="pag" value="layout"></input></td>
<input type="hidden" name="fab" value="$mCfgUFab"></input></td>
<input type="hidden" name="sys" value="$mCfgSyst"></input></td>
<input type="hidden" name="mod" value="$mRckMode"></input></td>
<input type="hidden" name="chs" value="${mCurChas}"></input></td>
<input type="hidden" name="ch1" value="$aCfgChas[1]"></input></td>
<input type="hidden" name="ch2" value="$aCfgChas[2]"></input></td>
<input type="hidden" name="ch3" value="$aCfgChas[3]"></input></td>
<table cellpadding="0" cellspacing="0" width="100%" border="0">
<tr><td align="right">
<input type="submit" name="submit" value="Help"></input>
</td></tr>
</table>
<center>
EOT

  print '<img src="' . $mLocation . '">' . "\n";

  print '<p><br>' . "\n";
  print '<font size="-2"><i>to store your UCS Layout, right click on the image and Save-As to a file</i></font>' . "\n";

  print '<p><br>' . "\n";
  print '<input type="submit" name="submit" value="Restart"></input>&nbsp;&nbsp;&nbsp;&nbsp;' . "\n";
  print '<input type="submit" name="submit" value="Return"></input>&nbsp;&nbsp;&nbsp;&nbsp;' . "\n";
  print '<input type="submit" name="submit" value="Back"></input>' . "\n";

  print <<EOT;
</center>
</form>
<p><br>
<p>
<hr>
<p><br>
</body>
</html>
EOT

}

########################################################################
