if ($mRckMode eq "AUTO") {
   $lXmlHdr = '<?xml version="1.0" encoding="UTF-8"?>' . 
              '<layout mode="AUTO" src="UCS" seq="' . $lSeqPict . '" res="LOW">';
} else { # MANUAL
   $lXmlHdr = '<?xml version="1.0" encoding="UTF-8"?>' .
              '<layout mode="MANUAL" src="UCS" seq="' . $lSeqPict . '" res="LOW">';
}

$lXmlFtr = '</layout>';

# in automatic mode

if ($mRckMode eq "AUTO")

            {

                        # nexus TOR switches

                        $lXmlNxs =                              '';

                        if ($lNxsQty > 0) {

                                    $lXmlNxs .=                 '    <switch model="' . $lNxsMod . '" qty="' . $lNxsQty . '" />';

                        }

 

                        # MDS SAN switches

                        $lXmlMds =                             '';

                        if ($lMdsQty > 0) {

                                    $lXmlMds .=                '    <switch model="' . $lMdsMod . '" qty="' . $lMdsQty . '" />';

                        }

 

                        # fabric interconnects

                        $lXmlFab =                              '';

                        if ($lFabQty > 0) {

                                    $lXmlFab .=                 '    <fabint model="' . $lFabMod . '" qty="' . $lFabQty . '">';

                                    if ($lExpQty > 0) {

                                                $lXmlFab .=     '        <expmod model="' . $lExpMod .'" qty="' . $lExpQty .'" />';

                                    }

                                    $lXmlFab .=                 '        <power qty="2" />';

                                    $lXmlFab .=                 '    </fabint>';

                        }

 

                        # blade chassis in auto

                        $lXmlChs =                              '';

                        for $ch (1 .. $mMaxChas) {

                                    $nrCh = doCfgStrElem($aCfgChas[$ch], 2);

                                    $nrBl = 0;

                                    for $b (1 .. $mBldNums) {

                                                $nrBl += doCfgStrElem($aCfgChas[$ch], 3 + $b);

                                    }

 

                                    if (($nrCh > 0) || ($nrBl > 0)) {

                                                my $lChsMod = "510" . doCfgStrElem($aCfgChas[$ch], 1);

                                                $lXmlChs .=                 '    <chassis model="UCS' . $lChsMod . '" cfg="' . $ch . '" qty="' . $nrCh . '">';

                                                $nrPSUs = doCfgStrElem($aCfgChas[$ch], 3);

                                                for $bl (1 .. $mBldNums) {

                                                            $nr = doCfgStrElem($aCfgChas[$ch], 3 + $bl);

                                                            if ($nr > 0) {

                                                                        $lXmlChs .=                 '        <blade model="' . $aBldMods[$bl] . '" qty="' . $nr . '" />';

                                                            }

                                                }

                                                if ($lIomCfg > 0) {

                                                            $lXmlChs .=                 '        <iomod model="' . $lIomMod . '" qty="' . $lIomQty . '" />';

                                                }

                                                $lXmlChs .=                 '        <power qty="' . $nrPSUs . '" />';

                                                $lXmlChs .=                 '    </chassis>';

                                    } # end if

                        } # end for

 

                        # fabric extenders

                        $lXmlFex =                               '';

                        if ($lFexCfg > 0) {

                                    $lXmlFex .=                  '    <fabext model="' . $lFexMod . '" qty="' . $lFexQty . '" />';

                        }

 

                        # rackmount servers

                        $lXmlSrv =                               '';

                        if ($lSrvQty > 0) {

                                    $lXmlSrv .=                  '    <rackmount>';

                                    for $sv (1 .. $mM45Nums) {

                                                if ($aSrvArr[$sv] > 0) {

                                                            $idx = $aGearIdx[$mFrstM45 - 1 + $sv];

                                                            $mod = uc($aGearTab[$idx][2]);

                                                $lXmlSrv .=      '        <server model="' . $mod . '" qty="' . $aSrvArr[$sv] . '" />';

                                                }

                                    }

                                    $lXmlSrv .=                  '    </rackmount>';

                        }

            } # end auto mode

 

            # in manual mode

            if ($mRckMode eq "MANUAL")

            {

                        # fabric interconnects for the expansion modules

                        $lXmlFab =                              '';

                        if ($lFabQty > 0) {

                                    $lXmlFab .=     '    <fabint model="' . $lFabMod . '" qty="0">';

                                    $lXmlFab .=     '        <expmod model=" . $lExpMod . " qty=" . $lExpQty . " />';

                                    $lXmlFab .=     '        <power qty="2" />';

                                    $lXmlFab .=     '    </fabint>';

                        }

 

                        # blade chassis in manual

                        $lXmlChs =                              '';

                        for $ch (1 .. $mMaxChas) {

                                    $nrCh = &doCfgStrElem($aCfgChas[$ch], 2);

                                    $nrBl = 0;

                                    for $b (1 .. $mBldNums) {

                                                $nrBl += doCfgStrElem($aCfgChas[$ch], 3 + $b);

                                    }

 

                                    if (($nrCh > 0) || ($nrBl > 0)) {

                                                my $lChasMod = "510" . doCfgStrElem($aCfgChas[$ch], 1);

                                                $lXmlChs .=                 '    <chassis model="UCS' . $lChasMod . '" cfg="' . $ch . '" qty="1">';

                                                $nrPSUs = doCfgStrElem($aCfgChas[$ch], 3);

                                                for $bl (1 .. $mBldNums) {

                                                            $nr = doCfgStrElem($aCfgChas[$ch], 3 + $bl);

                                                            if ($nr > 0) {

                                                                        $lXmlChs .=                 '        <blade model="' . $aBldMods[$bl] . '" qty="' . $nr . '" />';

                                                            }

                                                }

 

                                                # we don't know the number of fabint's, let's assume two

                                                if ($lIomCfg > 0) {

                                                            $lXmlChs .=                 '        <iomod model="' . $lIomMod . '" qty="' . '2' . '" />';

                                                }

                                                $lXmlChs .=                 '        <power qty="' . $nrPSUs . '" />';

                                                $lXmlChs .=                 '    </chassis>';

                                    } # end if

                        } # end for

 

                        # determine number of configured racks

                        $lNrRacks = 1;

                        for $rk (2 .. $mMaxRack) {

                                    if ($aCntGear[$rk] ne $mNoGear) {

                                                $lNrRacks = $rk;

                                    }

                        }

 

                        # racks with gear

                        for $r (1 .. $mMaxRack) {

                                    $aXmlRck[$r] =                        '';

                                    if ($aCntGear[$r] ne $mNoGear) {

                                                $aXmlRck[$r] .=           '    <rack cfg="' . $r . '" qty="1">';

                                                for $i (1 .. $mMaxGear) {

                                                            $lod = doCfgStrElem($aModGear[$r], $i);

                                                            if (($lod ne "") && ($lod ne "0") && ($lod ne "000")) {

                                                                        $idx = $aGearIdx[$lod];

                                                                        $ldl = uc($aGearTab[$idx][2]);

                                                                        $cnt = doCfgStrElem($aCntGear[$r], $i);

                                                                        $rev = doCfgStrElem($aRevGear[$r], $i);

                                                                        if ($rev != 1) {

                                                                                    $aXmlRck[$r] .=           '        <device model="' . $ldl . '" qty="' . $cnt . '" />';

                                                                        }

                                                                        else {

                                                                                    $aXmlRck[$r] .=           '        <device model="' . $ldl . '" qty="' . $cnt . '" reverse="YES" />';

                                                                        }

                                                            }

                                                }

                                                $aXmlRck[$r] .=           '    </rack>';

                                    }

                        }

            } # end manual mode

 

            # parameters

            $lXmlPar =                               '';

            $lXmlPar .=                              '    <params';

            if ($lSizWire eq "S") {

                        $lXmlPar .=                  ' wiring="SMALL"';

            }

            elsif ($lSizWire eq "M") {

                        $lXmlPar .=                  ' wiring="MEDIUM"';

            }

            elsif ($lSizWire eq "L") {

                        $lXmlPar .=                  ' wiring="LARGE"';

            }

            $lXmlPar .=                              ' ru="' . $lRckSize . '"';

            $lXmlPar .=                              ' extra="' . $lRckXtra . '"';

            if ($lRckFace eq "F") {

                        $lXmlPar .=                  ' face="FRONT"';

            }

            elsif ($lRckFace eq "R") {

                        $lXmlPar .=                  ' face="REAR"';

            }

            elsif ($lRckFace eq "P") {

                        $lXmlPar .=                  ' face="PERSPECTIVE"';

            }

            if ($bFrtBezl) {

                        $lXmlPar .=                  ' bezel="YES"';

            }

            else {

                        $lXmlPar .=                  ' bezel="NO"';

            }

            if (!$bSymmtrc) {

                        $lXmlPar .=                  ' fill="LINEAR"';

            }

            else {

                        $lXmlPar .=                  ' fill="SYMMETRIC"';

            }

            if ($lRckLoad eq "H") {

                        $lXmlPar .=                  ' load="HIGH"';

            }

            elsif ($lRckLoad eq "L") {

                        $lXmlPar .=                  ' load="LOW"';

            }

            elsif ($lRckLoad eq "N") {

                        $lXmlPar .=                  ' load="NO"';

            }

            if ($bAddPnls) {

                        $lXmlPar .=                  ' panels="YES"';

            }

            else {

                        $lXmlPar .=                  ' panels="NO"';

            }

            if ($lRckLogo eq "N") {

                        $lXmlPar .=                  ' logo="NONE"';

            }

            elsif ($lRckLogo eq "C") {

                        $lXmlPar .=                  ' logo="CISCO"';

            }

            elsif ($lRckLogo eq "P") {

                        $lXmlPar .=                  ' logo="FLEXPOD"';

            }

            elsif ($lRckLogo eq "B") {

                        $lXmlPar .=                  ' logo="VXBLOCK"';

            }

            elsif ($lRckLogo eq "V") {

                        $lXmlPar .=                  ' logo="VERSA"';

            }

            elsif ($lRckLogo eq "F") {

                        $lXmlPar .=                  ' logo="FSTACK"';

            }

            elsif ($lRckLogo eq "I") {

                        $lXmlPar .=                  ' logo="INTELLI"';

            }

            elsif ($lRckLogo eq "S") {

                        $lXmlPar .=                  ' logo="SMART"';

            }

            if ($lImgFrmt eq "P") {

                        $lXmlPar .=                  ' format="PHOTO"';

            }

            elsif ($lImgFrmt eq "D") {

                        $lXmlPar .=                  ' format="DRAWING"';

            }

            elsif ($lImgFrmt eq "O") {

                        $lXmlPar .=                  ' format="OVERLAY"';

            }

            if ($lImgSize eq "S") {

                        $lXmlPar .=                  ' size="SMALL"';

            }

            elsif ($lImgSize eq "M") {

                        $lXmlPar .=                  ' size="MEDIUM"';

            }

            elsif ($lImgSize eq "L") {

                        $lXmlPar .=                  ' size="LARGE"';

            }

            elsif ($lImgSize eq "X") {

                        $lXmlPar .=                  ' size="EXTRA"';

            }

            if ($bBckTrns) {

                        $lXmlPar .=                  ' trans="YES"';

            }

            else {

                        $lXmlPar .=                  ' trans="NO"';

            }

            $lXmlPar .=                              ' />';

 

            # compose the request

            $lXmlReq = $lXmlHdr . $lXmlNxs . $lXmlMds . $lXmlFab;

            if ($mRckMode eq "AUTO") {

                        $lXmlReq .= $lXmlChs . $lXmlFex . $lXmlSrv;

            }

            elsif ($mRckMode eq "MANUAL") {

                        $lXmlReq .= $lXmlChs;

                        for $r (1 .. $mMaxRack) {

                                    if ($aCntGear[$r] ne $mNoGear) {

                                                $lXmlReq .= $aXmlRck[$r];

                                    }

                        }

            }

            $lXmlReq .= $lXmlPar . $lXmlFtr;