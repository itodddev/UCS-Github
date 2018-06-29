<template>

    <div class="columns">
        <div class="column has-text-centered">
            
            <!-- Rack RUs Parameter -->

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

            <!-- Rack Face Parameter -->

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

            <!-- Front Bezel Parameter -->

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

            <!-- Rack Load Parameter -->

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

            <!-- Panels Parameter -->

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
        </div>
    </div>

</template>

<script>

    export default {
        
    }
</script>

<style scoped>
</style>
