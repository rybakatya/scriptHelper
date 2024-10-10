<script setup lang="ts">
import { ref } from 'vue';
import HyperLink from './components/HyperLink.vue';
import SkipQuestion from './components/SkipQuestion.vue';
import InputField from './components/InputField.vue';
import Viewer from './components/Viewer.vue';


const collectedID = ref(false);
const callerType = ref('Select');
const verified = ref(false);
const confirmedMedicalPlan = ref(false);
const memberConfirmedPlan = ref('Select');
const preferencesUpdatedAsked = ref(false);
const addressChangedResponse = ref('Select');
const firstTimeCalledAsked = ref(false);
const firstTimeCalledResponse = ref('Select');
const healthyBenefitsAsked = ref(false);
const isDsnpPlan = ref(false);
const clicked = ref(false);

const onClicked  = () =>{
  clicked.value = true;
}
</script>

<template>
  <Viewer v-if="clicked === false">
    <p class ="info">
      <h1>Using this tool.</h1>
      <li>Check off the boxes as you complete each task.</li> <li>For tasks you're not able to complete, check the box then select skip.</li>
      <li>The <span class ="alertText">red</span> text signifies information that you will obtain using omni 
      or other tools.</li> <li>The <span class="importantText">yellow</span> text signifies information that you will obtain from the member.</li>
      <li>The <span class="actionText">green</span> text signifies an action you must complete before ending the call.</li>
      
      <br>
      <p>Please email RRybak@C3Connect.com to report any bugs.</p>
      <br><br>
      <button @click="onClicked">Continue</button>
    
    </p>

  </Viewer>
  <header v-else class="customHeader">
    
    <div class="content">
      <div class="checkbox-group">
        <label>
          <input v-model="collectedID" id="memberID" type="checkbox" /> Member ID
        </label>
        <label>
          <input id="callerName" type="checkbox" /> Caller Name
        </label>
        <label>
          <input id="memberDOB" type="checkbox" /> Member D.O.B
        </label>
        <label>
          <input id="callbackNumber" type="checkbox" /> Callback Number
        </label>
      </div>

      <div class="importantText">
        <label>Caller Type:</label>
        <select v-model="callerType">
          <option>Select</option>
          <option>Member</option>
          <option>Broker</option>
          <option>Provider</option>
          <option>Other</option>
        </select>
      </div>

      <div v-if="callerType === 'Member'">
        <HyperLink href="https://github.com/rybakatya/callScript/blob/main/images/verification%20flow/member.png?raw=true" text="Click here to view HIPAA verification flow." />
      </div>
      <div v-if="callerType === 'Broker'">
        <HyperLink href="https://github.com/rybakatya/callScript/blob/main/images/verification%20flow/broker.png?raw=true" text="Click here to view HIPAA verification flow." />
      </div>
      <div v-if="callerType === 'Other'">
        <HyperLink href="https://github.com/rybakatya/callScript/blob/main/images/verification%20flow/third_party.png?raw=true" text="Click here to view HIPAA verification flow." />
      </div>

      <p class="text">
        <input v-model="verified" type="checkbox" /> Has HIPAA been verified for who you're speaking with?
      </p>

      <div v-if="callerType === 'Member' || callerType === 'Other'">
        <div class="alertText">
          <input v-model="confirmedMedicalPlan" type="checkbox" />
          Verify plan effective date, plan end date, plan name, and PCP/Medical group name.
        </div>
        <p v-if="confirmedMedicalPlan">
          <span class="importantText">Caller stated that nothing has changed?</span>
          <select v-model="memberConfirmedPlan">
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Skip</option>
          </select>
          <div v-if="memberConfirmedPlan === 'Skip'">
            <SkipQuestion />
          </div>
          <div v-if="memberConfirmedPlan === 'No'">
            <p class="actionText">Ensure you update whatever information is not up to date before ending this call.</p>
          </div>
        </p>

        <p class="alertText">
          <input v-model="isDsnpPlan" type="checkbox" />
          Is member enrolled in a DSNP plan?
        </p>
        <p class="importantText">
          <input v-model="preferencesUpdatedAsked" type="checkbox" />
          Has your address, phone number, or email changed?
        </p>

        <p v-if="preferencesUpdatedAsked">
          <span class="importantText">Caller stated that nothing has changed?</span>
          <select v-model="addressChangedResponse">
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Skip</option>
          </select>
          <div v-if="addressChangedResponse === 'Skip'">
            <SkipQuestion />
          </div>
          <div v-if="addressChangedResponse === 'No'">
            <p class="actionText">Ensure you update whatever information is not up to date before ending this call.</p>
          </div>
        </p>

        <p class="importantText">
          <input v-model="firstTimeCalledAsked" type="checkbox" />
          Is this your first time calling about this issue?
          <p v-if="firstTimeCalledAsked">
            <span class="importantText">Caller stated this is their first time calling?</span>
            <select v-model="firstTimeCalledResponse">
              <option>Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>Skip</option>
            </select>
            <div v-if="firstTimeCalledResponse === 'Skip'">
              <SkipQuestion />
            </div>
            <div v-if="firstTimeCalledResponse === 'No'">
              <span class="actionText">Apologize to the caller for having to call again. If caller seems frustrated, offer them a grievance. Check omni; if this is more than the third call about the issue, warm transfer to an MET agent.</span>
            </div>
          </p>
        </p>

        <p class="importantText">
          <input v-model="healthyBenefitsAsked" type="checkbox" />
          Review Gaps in Care - "I have a few healthy reminders here I would like to discuss with you..."
          <p class="actionText" v-if="!isDsnpPlan && healthyBenefitsAsked">When reviewing healthy benefits (gaps in care) DO NOT mention the annual health risk assessment to this caller!</p>
        </p>
      </div>
      <InputField label="Call Reason: " />
      <InputField label="Call Action: "/>
      <InputField label="Call Resolution"/>
    </div>
  </header>

  <main>
  </main>
</template>

<style>
.body
{
  overflow-x:hidden;
  position: absolute; 
  left:0vh;
  top:0;
  height:100%;
  width: 500px; /* Full width */
  
}

.info {
  position:absolute;
  top:2.5%;
  margin: 12.5px;
}
.customHeader
{
  position: absolute;
  left:1vh;
  top:0;
}

.checkbox-group
{
  color: #f39c12; 
}









</style>
