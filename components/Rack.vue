<template>

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

</div>
</div>

        
                


</template>

<script>
</script>

<style scoped>
</style>
