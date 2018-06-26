const InputForm = {
  template: ` 
    <div class="columns">
        <div class="column has-text-centered">
            <form @submit="submitForm">


                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">Rack RUs:</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                              <div class="select">
                                <select v-model="modA">
                                  <option value="000">--select--</option>
                                  <option value="SPACE1">Space 1 RU</option>
                                  <option value="SPACE2">Space 2 RU</option>
                                  <option value="SPACE6">Space 6 RU</option>
                                  <option value="PANEL1">Panel 1 RU</option>
                                  <option value="PANEL2">Panel 2 RU</option>
                                  <option value="PANEL6">Panel 6 RU</option>
                                  <option value="PATCH1">Patch 1 RU</option>
                                  <option value="PANDUIT1">Panduit 1 RU</option>
                                  <option value="PANDUIT2">Panduit 2 RU</option>
                                  <option value="PANDUIT3">Panduit 3 RU</option>
                                  <option value="PANDUCT1">Duct 1 RU</option>
                                  <option value="PANDUCT2">Duct 2 RU</option>
                                  <option value="PANRING1">D - Rings 1 RU</option>
                                  <option value="PANTRAY1">Tray 1 RU</option>
                                  <option value="PDU208M1">PDU RP208 M1</option>
                                  <option value="083">PDU RP208 M3</option>
                                  <option value="000">-- UCS Blades --</option>
                                  <option value="101">UCS FI 6120XP</option>
                                  <option value="102">UCS FI 6140XP</option>
                                  <option value="103">UCS FI 6248UP</option>
                                  <option value="104">UCS FI 6296UP</option>
                                  <option value="105">UCS FI 6332</option>
                                  <option value="106">UCS FI 6332 16UP</option>
                                  <option value="151">UCS Chassis 1</option>
                                  <option value="000">-- UCS Servers --</option>
                                  <option value="201">UCS C200-M1 SFF</option>
                                  <option value="202">UCS C200-M1 LFF</option>
                                  <option value="203">UCS C210-M1 SFF</option>
                                  <option value="204">UCS C210-M1 LFF</option>
                                  <option value="205">UCS C200-M2 SFF</option>
                                  <option value="206">UCS C200-M2 LFF</option>
                                  <option value="207">UCS C210-M2 SFF</option>
                                  <option value="208">UCS C210-M2 LFF</option>
                                  <option value="209">UCS C250-M2 SFF</option>
                                  <option value="210">UCS C260-M2 SFF</option>
                                  <option value="211">UCS C460-M2 SFF</option>
                                  <option value="212">UCS C22-M3 SFF</option>
                                  <option value="213">UCS C22-M3 LFF</option>
                                  <option value="214">UCS C24-M3 SFF</option>
                                  <option value="215">UCS C24-M3 LFF</option>
                                  <option value="216">UCS C220-M3 SFF</option>
                                  <option value="217">UCS C220-M3 LFF</option>
                                  <option value="218">UCS C240-M3 SFF</option>
                                  <option value="219">UCS C240-M3 LFF</option>
                                  <option value="220">UCS C420-M3 SFF</option>
                                  <option value="221">UCS C220-M4 SFF</option>
                                  <option value="222">UCS C220-M4 LFF</option>
                                  <option value="223">UCS C240-M4 S08</option>
                                  <option value="224">UCS C240-M4 S16</option>
                                  <option value="225">UCS C240-M4 S24</option>
                                  <option value="226">UCS C240-M4 LFF</option>
                                  <option value="227">UCS C460-M4 SFF</option>
                                  <option value="228">UCS C220-M5 SFF</option>
                                  <option value="229">UCS C220-M5 LFF</option>
                                  <option value="230">UCS C240-M5 S08</option>
                                  <option value="231">UCS C240-M5 S24</option>
                                  <option value="232">UCS C240-M5 LFF</option>
                                  <option value="233">UCS C480-M5 S08</option>
                                  <option value="234">UCS C480-M5 S16</option>
                                  <option value="235">UCS C480-M5 S24</option>
                                  <option value="236">UCS C480-M5 DVD</option>
                                  <option value="237">UCS C4200-M5 SFF</option>
                                  <option value="238">C880-M4</option>
                                  <option value="239">C880-M4 J1</option>
                                  <option value="240">C880-M4 J2</option>
                                  <option value="241">C880-M4 J1 S2</option>
                                  <option value="242">C880-M4 J2 S2</option>
                                  <option value="243">C880-M5</option>
                                  <option value="244">Bull C8S</option>
                                  <option value="245">Bull C16S</option>
                                  <option value="246">HX 220-M4</option>
                                  <option value="247">HX 220-M4 AF</option>
                                  <option value="248">HX 240-M4</option>
                                  <option value="249">HX 240-M4 AF</option>
                                  <option value="250">HX 220-M5</option>
                                  <option value="251">HX 220-M5 AF</option>
                                  <option value="252">HX 240-M5</option>
                                  <option value="253">HX 240-M5 AF</option>
                                  <option value="000">-- Storage --</option>
                                  <option value="254">UCS C3160-M3</option>
                                  <option value="255">UCS C3260-M3</option>
                                  <option value="256">UCS S3260-M4</option>
                                  <option value="257">UCS S3260-M5</option>
                                  <option value="000">-- Nexus --</option>
                                  <option value="411">Nexus 1010</option>
                                  <option value="412">Nexus 1100</option>
                                  <option value="413">Nexus 2148T</option>
                                  <option value="414">Nexus 2224TP</option>
                                  <option value="415">Nexus 2232PP</option>
                                  <option value="416">Nexus 2232TM</option>
                                  <option value="417">Nexus 2232TP</option>
                                  <option value="418">Nexus 2248PQ</option>
                                  <option value="419">Nexus 2248TP</option>
                                  <option value="421">Nexus 2332TQ</option>
                                  <option value="422">Nexus 2348UPQ</option>
                                  <option value="423">Nexus 2348TQ</option>
                                  <option value="431">Nexus 3016Q</option>
                                  <option value="432">Nexus 3048TP</option>
                                  <option value="433">Nexus 3064PQ</option>
                                  <option value="434">Nexus 3064T</option>
                                  <option value="436">Nexus 3132QV</option>
                                  <option value="437">Nexus 3132QX</option>
                                  <option value="435">Nexus 3132Q</option>
                                  <option value="438">Nexus 3164Q</option>
                                  <option value="439">Nexus 3172PQ</option>
                                  <option value="440">Nexus 3172TQ</option>
                                  <option value="441">Nexus 31108PC</option>
                                  <option value="442">Nexus 31108TC</option>
                                  <option value="443">Nexus 31128PQ</option>
                                  <option value="444">Nexus 3232C</option>
                                  <option value="445">Nexus 3264Q</option>
                                  <option value="446">Nexus 3524P</option>
                                  <option value="447">Nexus 3548P</option>
                                  <option value="448">Nexus 3548X</option>
                                  <option value="449">Nexus 3636C</option>
                                  <option value="450">Nexus 36180YC</option>
                                  <option value="451">Nexus 5010</option>
                                  <option value="452">Nexus 5020</option>
                                  <option value="453">Nexus 5532P</option>
                                  <option value="454">Nexus 5532UP</option>
                                  <option value="455">Nexus 5548P</option>
                                  <option value="456">Nexus 5548UP</option>
                                  <option value="457">Nexus 5596P</option>
                                  <option value="458">Nexus 5596UP</option>
                                  <option value="461">Nexus 5624Q</option>
                                  <option value="462">Nexus 5648Q</option>
                                  <option value="463">Nexus 5672UP</option>
                                  <option value="464">Nexus 5696Q</option>
                                  <option value="465">Nexus 56128P</option>
                                  <option value="466">Nexus 6001</option>
                                  <option value="467">Nexus 6004</option>
                                  <option value="471">Nexus 7004</option>
                                  <option value="472">Nexus 7009</option>
                                  <option value="473">Nexus 7010</option>
                                  <option value="474">Nexus 7018</option>
                                  <option value="475">Nexus 7702</option>
                                  <option value="476">Nexus 7706</option>
                                  <option value="477">Nexus 7710</option>
                                  <option value="478">Nexus 7718</option>
                                  <option value="481">Nexus 9236C</option>
                                  <option value="482">Nexus 9272Q</option>
                                  <option value="483">Nexus 92160YC</option>
                                  <option value="484">Nexus 92300YC</option>
                                  <option value="485">Nexus 92304QC</option>
                                  <option value="486">Nexus 9332PQ</option>
                                  <option value="487">Nexus 9336PQ</option>
                                  <option value="488">Nexus 9336C</option>
                                  <option value="489">Nexus 9348GC</option>
                                  <option value="490">Nexus 9364C</option>
                                  <option value="491">Nexus 9372PX</option>
                                  <option value="492">Nexus 9372TX</option>
                                  <option value="493">Nexus 9396PX</option>
                                  <option value="494">Nexus 9396TX</option>
                                  <option value="495">Nexus 93108TC</option>
                                  <option value="496">Nexus 93120TX</option>
                                  <option value="497">Nexus 93128TX</option>
                                  <option value="498">Nexus 93180YC</option>
                                  <option value="499">Nexus 93180LC</option>
                                  <option value="500">Nexus 93240YC</option>
                                  <option value="511">Nexus 9504</option>
                                  <option value="512">Nexus 9508</option>
                                  <option value="513">Nexus 9516</option>
                                  <option value="000">-- Catalyst --</option>
                                  <option value="521">Cat 2960S</option>
                                  <option value="522">Cat 2960X</option>
                                  <option value="531">Cat 3650</option>
                                  <option value="533">Cat 3850X</option>
                                  <option value="532">Cat 3850</option>
                                  <option value="561">Cat 6800</option>
                                  <option value="562">Cat 6807</option>
                                  <option value="563">Cat 6816</option>
                                  <option value="564">Cat 6824</option>
                                  <option value="565">Cat 6832</option>
                                  <option value="566">Cat 6840</option>
                                  <option value="567">Cat 6880</option>
                                  <option value="591">Cat 9324</option>
                                  <option value="592">Cat 9348</option>
                                  <option value="593">Cat 9404</option>
                                  <option value="594">Cat 9407</option>
                                  <option value="595">Cat 9410</option>
                                  <option value="596">Cat 9512</option>
                                  <option value="597">Cat 9524</option>
                                  <option value="598">Cat 9540</option>
                                  <option value="000">-- Cisco ISR --</option>
                                  <option value="601">ISR 2911</option>
                                  <option value="000">-- Cisco ASR --</option>
                                  <option value="611">ASR 1001</option>
                                  <option value="612">ASR 1002</option>
                                  <option value="613">ASR 1004</option>
                                  <option value="614">ASR 1006</option>
                                  <option value="615">ASR 1009</option>
                                  <option value="616">ASR 1013</option>
                                  <option value="000">-- Cisco ASA --</option>
                                  <option value="651">ASA 5512</option>
                                  <option value="652">ASA 5525</option>
                                  <option value="653">ASA 5545</option>
                                  <option value="654">ASA 5555</option>
                                  <option value="655">ASA 5585</option>
                                  <option value="000">-- Cisco FPR --</option>
                                  <option value="661">FPR 4110</option>
                                  <option value="662">FPR 9300</option>
                                  <option value="000">-- Mellanox --</option>
                                  <option value="671">MX SX6018</option>
                                  <option value="672">MX SB7700</option>
                                  <option value="673">MX SB7790</option>
                                  <option value="000">-- Cisco Video --</option>
                                  <option value="681">DMC 9901</option>
                                  <option value="682">DMC 9902</option>
                                  <option value="683">CDE 400</option>
                                  <option value="684">CDE 420</option>
                                  <option value="685">CDE 460</option>
                                  <option value="691">NCS 5011</option>
                                  <option value="692">NCS 5502</option>
                                  <option value="693">NCS 5504</option>
                                  <option value="694">NCS 5508</option>
                                  <option value="695">NCS 5516</option>
                                  <option value="000">-- Cisco MDS --</option>
                                  <option value="711">MDS 9124</option>
                                  <option value="712">MDS 9132T</option>
                                  <option value="713">MDS 9134</option>
                                  <option value="715">MDS 9148S</option>
                                  <option value="714">MDS 9148</option>
                                  <option value="721">MDS 9221i</option>
                                  <option value="722">MDS 9222i</option>
                                  <option value="723">MDS 9250i</option>
                                  <option value="731">MDS 9396S</option>
                                  <option value="751">MDS 9506</option>
                                  <option value="752">MDS 9509</option>
                                  <option value="753">MDS 9513</option>
                                  <option value="771">MDS 9706</option>
                                  <option value="772">MDS 9710</option>
                                  <option value="773">MDS 9718</option>
                                  <option value="000">-- Dell --</option>
                                  <option value="800">Dell R640</option>
                                  <option value="000">-- NetApp --</option>
                                  <option value="801">NetApp FAS 2020</option>
                                  <option value="802">NetApp FAS 2240</option>
                                  <option value="803">NetApp FAS 2520</option>
                                  <option value="804">NetApp FAS 2552</option>
                                  <option value="805">NetApp FAS 2554</option>
                                  <option value="806">NetApp FAS 2600</option>
                                  <option value="807">NetApp FAS 3210</option>
                                  <option value="808">NetApp FAS 6210</option>
                                  <option value="809">NetApp FAS 8020</option>
                                  <option value="810">NetApp FAS 8040</option>
                                  <option value="811">NetApp FAS 8060</option>
                                  <option value="812">NetApp FAS 8080</option>
                                  <option value="813">NetApp FAS 8200</option>
                                  <option value="814">NetApp FAS 9000</option>
                                  <option value="815">NetApp EF540</option>
                                  <option value="816">NetApp AFF A200</option>
                                  <option value="817">NetApp AFF A300</option>
                                  <option value="818">NetApp AFF A700</option>
                                  <option value="819">NetApp AFF A700s</option>
                                  <option value="820">NetApp DS2246</option>
                                  <option value="821">NetApp DS224C</option>
                                  <option value="822">NetApp DS4243</option>
                                  <option value="000">-- Pure --</option>
                                  <option value="831">FA400 Base</option>
                                  <option value="832">FA400 Exp</option>
                                  <option value="833">M-Series Array</option>
                                  <option value="834">M-Series Shelf</option>
                                  <option value="835">X-Series Array</option>
                                  <option value="836">Blades Array</option>
                                  <option value="000">-- Tegile --</option>
                                  <option value="838">Tegile T3800</option>
                                  <option value="839">Tegile T3200</option>
                                  <option value="000">-- EMC --</option>
                                  <option value="841">EMC AX4</option>
                                  <option value="842">EMC AX4 Tray</option>
                                  <option value="843">EMC CX4</option>
                                  <option value="844">EMC CX4 Tray</option>
                                  <option value="845">EMC VNXe 3100</option>
                                  <option value="846">EMC VNXe 3300</option>
                                  <option value="847">EMC VNX 5100</option>
                                  <option value="848">EMC VNX 5300</option>
                                  <option value="849">EMC VNX 5500</option>
                                  <option value="850">EMC VNX 5200</option>
                                  <option value="851">EMC VNX 5400</option>
                                  <option value="852">EMC VNX 5600</option>
                                  <option value="853">EMC VNX 5401</option>
                                  <option value="854">EMC VNX 5402</option>
                                  <option value="855">EMC VNX 5403</option>
                                  <option value="856">EMC VNX 5404</option>
                                  <option value="857">EMC VNX 5405</option>
                                  <option value="858">EMC VNX Ctrl</option>
                                  <option value="859">EMC VNX Disk</option>
                                  <option value="860">EMC Unity DPE</option>
                                  <option value="861">EMC Unity DAE</option>
                                  <option value="862">EMC XtremIO DPE</option>
                                  <option value="863">EMC XtremIO DAE</option>
                                  <option value="864">EMC XtremIO SPS</option>
                                  <option value="865">EMC VMAX DPE</option>
                                  <option value="866">EMC VMAX DAE</option>
                                  <option value="867">EMC VMAX SPS</option>
                                  <option value="868">EMC Data Domain</option>
                                  <option value="000">-- IBM --</option>
                                  <option value="870">IBM SVC</option>
                                  <option value="871">V5000 Ctr SFF</option>
                                  <option value="872">V5000 Exp SFF</option>
                                  <option value="873">V5030 Ctr SFF</option>
                                  <option value="874">V5030 Exp SFF</option>
                                  <option value="875">V7000 Unified</option>
                                  <option value="876">V7000 Ctr SFF</option>
                                  <option value="877">V7000 Exp SFF</option>
                                  <option value="878">V7000 Ctr LFF</option>
                                  <option value="879">V7000 Exp LFF</option>
                                  <option value="880">V7000 G3 Ctr</option>
                                  <option value="881">V7000 G3 Exp</option>
                                  <option value="882">V9000 Ctr SSD</option>
                                  <option value="883">V9000 Exp SSD</option>
                                  <option value="000">-- HDS VSP --</option>
                                  <option value="885">VSP G400 Ctr</option>
                                  <option value="886">VSP G400 Exp</option>
                                  <option value="887">HDS VSP 14RU</option>
                                  <option value="888">HDS VSP 42RU</option>
                                  <option value="000">-- Nimble --</option>
                                  <option value="891">Nimble CS460</option>
                                  <option value="892">Nimble CS500</option>
                                  <option value="893">Nimble AF3000</option>
                                  <option value="894">Nimble AF5000</option>
                                  <option value="895">Nimble AF7000</option>
                                  <option value="896">Nimble AF9000</option>
                                  <option value="897">Nimble AF Exp</option>
                                  <option value="000"></option>
                                </select>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">Rack RUs:</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                              <div class="select">
                                <select v-model="ruSelection">
                                  <option>Select RUs</option>
                                  <option> 18 </option>
                                  <option> 24 </option>
                                  <option> 30 </option>
                                  <option> 36 </option>
                                  <option> 42 </option>
                                  <option> 48 </option>
                                  <option> 54 </option>
                                  <option> 60 </option>
                                </select>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">Rack Face:</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control has-text-centered">
                                <label class="radio">
                                    <input type="radio" name="face" value="FRONT" v-model="rackFace"> &nbsp;Front
                                </label>
                                <label class="radio">
                                    <input type="radio" name="face" value="REAR" v-model="rackFace"> &nbsp;Rear
                                </label>
                                <label class="radio">
                                    <input type="radio" name="face" value="PERSPECTIVE" v-model="rackFace"> &nbsp;Perspective
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

              <div class="field is-horizontal">
                <div class="field-label">
                  <label class="label">Front Bezel:</label>
                </div>
                <div class="field-body">
                  <div class="field is-narrow">
                    <div class="control has-text-centered">
                      <label class="radio">
                        <input type="radio" name="bezl" value="YES" v-model="frontBezel"> &nbsp;Yes
                                </label>
                        <label class="radio">
                          <input type="radio" name="bezl" value="NO" v-model="frontBezel"> &nbsp;No
                                </label>
                          
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">Rack Load:</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control has-text-centered">
                                <label class="radio">
                                    <input type="radio" name="load" value="HIGH" v-model="rackLoad"> &nbsp;High
                                </label>
                                <label class="radio">
                                    <input type="radio" name="load" value="LOW" v-model="rackLoad"> &nbsp;Low
                                </label>
                                <label class="radio">
                                    <input type="radio" name="load" value="NO" v-model="rackLoad"> &nbsp;No Rack
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">Panels:</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control has-text-centered">
                                <label class="radio">
                                    <input type="radio" name="pnls" value="YES" v-model="panels"> &nbsp;Yes
                                </label>
                                <label class="radio">
                                    <input type="radio" name="pnls" value="NO" v-model="panels"> &nbsp;No
                                </label>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <!-- Left empty for spacing -->
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  `,
  data() {
    return {
      modA: '',
      ruSelection: 42,
      rackFace: 'FRONT',
      frontBezel: 'YES',
      rackLoad: 'HIGH',
      panels: 'YES',
      paramsStart: '<params ',
      build: ''
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      this.build = '';
      this.build = this.build + this.paramsStart + 'ru="' + this.ruSelection + '" extra="0" ';


      if (this.rackFace === "FRONT") {
        this.build = this.build + 'face="FRONT" ';
      } else if (this.rackFace === 'REAR') {
        this.build = this.build + 'face="REAR" ';
      } else if (this.rackFace === 'PERSPECTIVE') {
        this.build = this.build + 'face="PERSPECTIVE" ';
      }

      if (this.frontBezel === "YES") {
        this.build = this.build + 'bezel="YES" ';
      } else if (this.frontBezel === 'NO') {
        this.build = this.build + 'bezel="NO" ';
      } 

      if (this.rackLoad === "HIGH") {
        this.build = this.build + 'load="HIGH" ';
      } else if (this.rackLoad === 'LOW') {
        this.build = this.build + 'load="LOW" ';
      } else if (this.rackLoad === 'NO') {
        this.build = this.build + 'load="NO" ';
      }

      if (this.panels === "YES") {
        this.build = this.build + 'panels="YES" ';
      } else if (this.frontBezel === 'NO') {
        this.build = this.build + 'panels="NO" ';
      }

      this.build = this.build + ('/>');
      console.log(this.build);
    }
  }
}

new Vue({
  el: '#app',
  components: {
    'input-form': InputForm
  }
})