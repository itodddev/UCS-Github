

const InputForm = {
    template: ` 
    <div class="columns">
        <div class="column has-text-centered">
            <form @submit="submitForm">
                <br>
                <br>
             


<div class="field is-horizontal">
                    <div class="field-label">
                        <select v-model="modA1">
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
                        <option value="PDU208M3">PDU RP208 M3</option>
                        <option value="000">-- Nexus --</option>
                        <option value="NX5548P">Nexus 5548P</option>
                        <option value="NX5548UP">Nexus 5548UP</option>
                        <option value="NX5596P">Nexus 5596P</option>
                        <option value="NX5596UP">Nexus 5596UP</option>
                        <option value="000">-- Cisco MDS --</option>
                        <option value="MDS9124">MDS 9124</option>
                        <option value="MDS9132T">MDS 9132T</option>
                        <option value="MDS9134">MDS 9134</option>
                        <option value="MDS9148S">MDS 9148S</option>
                        <option value="MDS9148">MDS 9148</option>
                        <option value="MDS9221I">MDS 9221i</option>
                        <option value="MDS9222I">MDS 9222i</option>
                        <option value="MDS9250I">MDS 9250i</option>
                        <option value="MDS9396S">MDS 9396S</option>
                        <option value="MDS9506">MDS 9506</option>
                        <option value="MDS9509">MDS 9509</option>
                        <option value="MDS9513">MDS 9513</option>
                        <option value="MDS9706">MDS 9706</option>
                        <option value="MDS9710">MDS 9710</option>
                        <option value="MDS9718">MDS 9718</option>
                        <option value="000">-- NetApp --</option>
                        <option value="NA2020">NetApp FAS 2020</option>
                        <option value="NA2240">NetApp FAS 2240</option>
                        <option value="NA2520">NetApp FAS 2520</option>
                        <option value="NA2552">NetApp FAS 2552</option>
                        <option value="NA2554">NetApp FAS 2554</option>
                        <option value="NA2600">NetApp FAS 2600</option>
                        <option value="NA3210">NetApp FAS 3210</option>
                        <option value="NA6210">NetApp FAS 6210</option>
                        <option value="NA8020">NetApp FAS 8020</option>
                        <option value="NA8040">NetApp FAS 8040</option>
                        <option value="NA8060">NetApp FAS 8060</option>
                        <option value="NA8080">NetApp FAS 8080</option>
                        <option value="NA8200">NetApp FAS 8200</option>
                        <option value="NA9000">NetApp FAS 9000</option>
                        <option value="NA540">NetApp EF540</option>
                        <option value="NA200">NetApp AFF A200</option>
                        <option value="NA300">NetApp AFF A300</option>
                        <option value="NA700">NetApp AFF A700</option>
                        <option value="NA700S">NetApp AFF A700s</option>
                        <option value="NA2246">NetApp DS2246</option>
                        <option value="NA224C">NetApp DS224C</option>
                        <option value="NA4243">NetApp DS4243</option>
                    </select>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control has-text-centered">
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="0" v-model="modA1Q"> &nbsp;0
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="1" v-model="modA1Q"> &nbsp;1
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="2" v-model="modA1Q"> &nbsp;2
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="3" v-model="modA1Q"> &nbsp;3
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="4" v-model="modA1Q"> &nbsp;4
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="6" v-model="modA1Q"> &nbsp;6
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="8" v-model="modA1Q"> &nbsp;8
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="12" v-model="modA1Q"> &nbsp;12
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine1" value="16" v-model="modA1Q"> &nbsp;16
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">
                    <div class="field-label">
                        <select v-model="modA2">
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
                        <option value="PDU208M3">PDU RP208 M3</option>
                        <option value="000">-- Nexus --</option>
                        <option value="NX5548P">Nexus 5548P</option>
                        <option value="NX5548UP">Nexus 5548UP</option>
                        <option value="NX5596P">Nexus 5596P</option>
                        <option value="NX5596UP">Nexus 5596UP</option>
                        <option value="000">-- Cisco MDS --</option>
                        <option value="MDS9124">MDS 9124</option>
                        <option value="MDS9132T">MDS 9132T</option>
                        <option value="MDS9134">MDS 9134</option>
                        <option value="MDS9148S">MDS 9148S</option>
                        <option value="MDS9148">MDS 9148</option>
                        <option value="MDS9221I">MDS 9221i</option>
                        <option value="MDS9222I">MDS 9222i</option>
                        <option value="MDS9250I">MDS 9250i</option>
                        <option value="MDS9396S">MDS 9396S</option>
                        <option value="MDS9506">MDS 9506</option>
                        <option value="MDS9509">MDS 9509</option>
                        <option value="MDS9513">MDS 9513</option>
                        <option value="MDS9706">MDS 9706</option>
                        <option value="MDS9710">MDS 9710</option>
                        <option value="MDS9718">MDS 9718</option>
                        <option value="000">-- NetApp --</option>
                        <option value="NA2020">NetApp FAS 2020</option>
                        <option value="NA2240">NetApp FAS 2240</option>
                        <option value="NA2520">NetApp FAS 2520</option>
                        <option value="NA2552">NetApp FAS 2552</option>
                        <option value="NA2554">NetApp FAS 2554</option>
                        <option value="NA2600">NetApp FAS 2600</option>
                        <option value="NA3210">NetApp FAS 3210</option>
                        <option value="NA6210">NetApp FAS 6210</option>
                        <option value="NA8020">NetApp FAS 8020</option>
                        <option value="NA8040">NetApp FAS 8040</option>
                        <option value="NA8060">NetApp FAS 8060</option>
                        <option value="NA8080">NetApp FAS 8080</option>
                        <option value="NA8200">NetApp FAS 8200</option>
                        <option value="NA9000">NetApp FAS 9000</option>
                        <option value="NA540">NetApp EF540</option>
                        <option value="NA200">NetApp AFF A200</option>
                        <option value="NA300">NetApp AFF A300</option>
                        <option value="NA700">NetApp AFF A700</option>
                        <option value="NA700S">NetApp AFF A700s</option>
                        <option value="NA2246">NetApp DS2246</option>
                        <option value="NA224C">NetApp DS224C</option>
                        <option value="NA4243">NetApp DS4243</option>
                    </select>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control has-text-centered">
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="0" v-model="modA2Q"> &nbsp;0
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="1" v-model="modA2Q"> &nbsp;1
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="2" v-model="modA2Q"> &nbsp;2
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="3" v-model="modA2Q"> &nbsp;3
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="4" v-model="modA2Q"> &nbsp;4
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="6" v-model="modA2Q"> &nbsp;6
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="8" v-model="modA2Q"> &nbsp;8
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="12" v-model="modA2Q"> &nbsp;12
                                </label>
                                <label class="radio">
                                    <input type="radio" name="modALine2" value="16" v-model="modA2Q"> &nbsp;16
                                </label>
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
                            <pre> {{ $data.build }}</pre>
                            <br>
                            <pre>{{ $data }}</pre>
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  `,
    data() {
        return {
            modA1: 000,
            modA1Q: 0,
            modA2: 000,
            modA2Q: 0,
            ruSelection: 42,
            rackFace: 'FRONT',
            frontBezel: 'YES',
            rackLoad: 'HIGH',
            panels: 'YES',
            paramsStart: '<params ',
            build: '',
            rackArray: [],
            rackHead: '<rack cfg="1" qty="1">\n',
            indent: '   ',
            rackFooter: '</rack>',
            rackTag: '',
            xmlHeader: '<?xml version="1.0" encoding="UTF-8"?>\n<layout mode = "MANUAL" src = "UCS" seq = "" res = "LOW" >\n',
            xmlFooter: '</layout>',
            finalXML: '',
        }
    },
    methods: {
        submitForm(evt) {
            evt.preventDefault();
            this.build = '';
            this.rackTag= '';
            this.finalXML = '';

            this.build = this.build + this.paramsStart + 'ru="' + this.ruSelection + '" extra="0" ';

            this.rackArray[0] = this.modA1;
            this.rackArray[1] = this.modA1Q;
            this.rackArray[2] = this.modA2;
            this.rackArray[3] = this.modA2Q;

            this.rackTag = this.rackTag + this.rackHead;
            
            for(var item = 0; item < this.rackArray.length; item += 2) {
                this.rackTag = this.rackTag + this.indent + '<device model="' + this.rackArray[item] + '" qty="' + this.rackArray[(item + 1)] + '" />\n';
            }

            this.rackTag = this.rackTag + this.rackFooter + '\n';

            console.log(this.rackTag);

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
            } else if (this.rackLoad === "LOW") {
                this.build = this.build + 'load="LOW" ';
            } else if (this.rackLoad === "NO") {
                this.build = this.build + 'load="NO" ';
            }

            if (this.panels === "YES") {
                this.build = this.build + 'panels="YES" ';
            } else if (this.panels === "NO") {
                this.build = this.build + 'panels="NO" ';
            }

            this.build = this.build + ('/>');
            //console.log(this.build);

            this.finalXML = this.finalXML + this.xmlHeader + this.rackTag + this.build + this.xmlFooter;
            console.log(this.finalXML);
            var url= 'http://localhost:3000/xml'
            axios.post(url, { data: this.finalXML}).then(function(response) {
                //console.log('response: ' + response);
            });
        }
    }
}

new Vue({
    el: '#app',
    components: {
        'input-form': InputForm
    }
})