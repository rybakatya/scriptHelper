<script setup lang="ts">
import { ref } from 'vue';
import HyperLink from './components/HyperLink.vue';
import SkipQuestion from './components/SkipQuestion.vue';
import Viewer from './components/Viewer.vue';
import DeadAirTimer from './components/DeadAirTimer.vue';
import Navbar from './components/Navbar.vue'


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
const canCallFirstName = ref(false);
const callingForSelf = ref(false);
const verbalAuthObtained = ref(false);
const memberState = ref('Select');

const selectedStateIndex = ref(0);

const onStateChanged = (event: Event) => {
  alert("called");
  const target = event.target as HTMLSelectElement;
  selectedStateIndex.value = target.selectedIndex;
};

const onClicked  = () =>{
  clicked.value = true;
}



const stateInfo = 
[
  [ 
    "Select",
    null,
    null,
    null,
    null,
    null,
    false
  ],
  [
    "Alabama (AL)", 
    "Wellcare by Allwell", 
    "https://wellcarecomplete.com/", 
    "NA", 
    "NA", 
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=74388#:~:text=%2D-,Alabama,-Plan%20website%3A",
    false
  ],

  [
    "Arizona (AZ)", 
    "Wellcare by Allwell", 
    "https://wellcare.azcompletehealth.com/", 
    "NA", 
    "NA", 
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=74388#:~:text=%2D-,Arizona,-Plan%20Website%3A",
    false
  ],

  [
    "Arkansas (AR)", 
    "Wellcare By Allwell", 
    "https://wellcare.arhealthwellness.com/", 
    "NA", 
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Arkansas,-Plan%20Website%3A",
    true
  ],

  [
    "California (CA)",
    "Wellcare By Health Net",
    "https://wellcare.healthnetcalifornia.com/", 
    "www.Healthnet.com", 
    "https://wellcare.healthnetcalifornia.com/ ",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,California,-Plan%20Website%3A",
    true
  
  ],

  [
    "Deleware (DE)", 
    "Wellcare", 
    "https://www.wellcare.com/de",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Delaware,-Plan%20Website%3A",
    true
  ], 

  [
    "Florida (FL)",
    "Wellcare By Allwell", 
    "https://wellcarecomplete.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Florida,-Plan%20Website%3A",
    true

  ],

  [
    "Illinois (IL)",
    "Wellcare By Allwell", 
    "https://wellcarecomplete.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Illinois,-Plan%20Website%3A",
    true
  ],

  [
    "Indiana (IN)",
    "Wellcare By Allwell", 
    "https://wellcare.mhsindiana.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Indiana,-Plan%20Website%3A",
    true
  ],

  [
    "Kansas (KS)",
    "Wellcare By Allwell", 
    "https://wellcare.sunflowerhealthplan.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Kansas,-Plan%20Website%3A",
    true
  ],

  [
    "Michigan (MI)",
    "Wellcare By Allwell",
    "https://www.wellcarecomplete.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Michigan,-Plan%20Website%3A",
    true
  ],

  [
    "Missouri (MO)",
    "Wellcare By Allwell",
    "https://wellcare.homestatehealth.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Missouri,-Plan%20Website%3A",
    true
  ],

  [
    "Nebraska (NE)",
    "Wellcare",
    "https://www.wellcarene.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Nevada,-Plan%20Website%3A",
    true
  ],

  [
    "Nevada (NV)",
    "Wellcare By Allwell",
    "https://wellcare.silversummithealthplan.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Nevada,-Plan%20Website%3A",
    false
  ],

  [
    "New Mexico (NM)",
    "Wellcare By Allwell", 
    "https://wellcare.westernskycommunitycare.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,New%20Mexico,-Plan%20Website%3A",
    false
  ],

  [
    "Ohio (OH)",
    "Wellcare By Allwell", 
    "https://wellcare.buckeyehealthplan.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Ohio,-Plan%20Website%3A",
    true
  ],

  [
    "Oklahoma (OK)",
    "Wellcare",
    "https://www.wellcareok.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Oklahoma,-Plan%20Website%3A",
    true
  ],

  [
    "Oregon (OR)", 
    "Wellcare By Health Net", 
    "https://wellcare.healthnetoregon.com/", 
    "https://wellcare.trilliumadvantage.com/",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=Oregon%20and%20Washington",
    true
  ],

  [
    "Pennsylvania (PA)",
    "Wellcare By Allwell", 
    "https://wellcare.pahealthwellness.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Pennsylvania,-Plan%20Website%3A",
    true
  ],

  [
    "Texas (TX)",
    "Wellcare by Allwell",
    "https://wellcare.superiorhealthplan.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Texas,-Plan%20Website%3A",
    true
  ],

  [
    "Washington (WA)", 
    "Wellcare By Health Net", 
    "https://wellcare.healthnetoregon.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=Oregon%20and%20Washington",
    true
  ],

  [
    "Wisconsin (WI)",
    "Wellcare By Allwell",
    "https://wellcare.mhswi.com/",
    "NA",
    "NA",
    "https://cenpointprd.ad.wellcare.com/articles/5c815a45-90f1-4f67-8b4b-7d52f92f3546?row=1&memory=46718#:~:text=%2D-,Wisconsin,-Plan%20Website%3A",
    true
  ]
]
</script>

<template>


  <Viewer v-if="clicked === false">
    <div class ="info">
      <h1>Using this tool.</h1>
      <li>Check off the boxes as you complete each task.</li> <li>For tasks you're not able to complete, check the box then select skip.</li>
      <li>The <span class ="alertText">red</span> text signifies information that you will obtain using omni 
      or other tools.</li> <li>The <span class="importantText">yellow</span> text signifies information that you will obtain from the caller.</li>
      <li>The <span class="actionText">green</span> text signifies an action you must complete before ending the call.</li>
      <li>This page will play a beep after 12 seconds of dead air time.</li>
      <li>At the bottom of the page you can find a hold timer. The timer will play 3 distinct beeps to warn you of your timer ending soon. One when 60 seconds remains on your timer, another when 30 seconds remain, and another when only 15 seconds remains.</li>
      <br>
      Please email RRybak@C3Connect.com to report any bugs.
      <br><br>
      <button @click="onClicked">Continue</button>
    
      </div>

  </Viewer>
  


  <div v-if="clicked ===true" class="customHeader">
    
    <Navbar />

    <div class="content">
      <div class="checkbox-group">
        <label class="importantText">
          <input v-model="collectedID" id="memberID" type="checkbox"> Member ID </input>
        </label>
        <label class="importantText">
          <input id="callerName" type="checkbox"> Caller Name </input>
        </label>

      </div>
      <p class="importantText">
          <input v-model="canCallFirstName" type="checkbox" />
         "Is it ok if I call you by your first name?"
        </p>

              <p class="importantText">
          <input v-model="callingForSelf" type="checkbox" />
         "Are you calling for yourself or for someone else?"
        </p>

      <div class="checkbox-group">
        <label class="importantText">
          <input id="callbackNumber" type="checkbox" /> Callback Number
        </label>
        <label class="importantText">
          <input id="memberDOB" type="checkbox" /> Member D.O.B
        </label>
      </div>

      <div >
        <label class="importantText">Caller Type:</label>
        <select class="dropDown" v-model="callerType">
          <option>Select</option>
          <option>Member</option>
          <option>Broker</option>
          <option>Provider</option>
          <option>Other</option>
        </select>

        <label class="alertText">Member State:</label>
        <select @change="onStateChanged" v-model="memberState" class="dropDown">
          <option v-for="state in stateInfo">{{state[0]}}</option>
        </select>
        <br>
        <HyperLink v-if="selectedStateIndex != 0" :href="stateInfo[selectedStateIndex][2]" :text="stateInfo[selectedStateIndex][2]"/>
        <br>
        <HyperLink v-if="selectedStateIndex != 0" :href="stateInfo[selectedStateIndex][5]" text="Click here for state info" />
      </div>

      <p v-if="callerType === 'Select'" class="completionAlert">Please ensure that you select the caller type before proceeding!</p>
      <p v-if="memberState === 'Select'" class="secondaryCompletionAlert">Please ensure that you select the member state before proceeding!</p>

      
      <div v-if="callerType === 'Member'">
        <HyperLink href="https://github.com/rybakatya/callScript/blob/main/images/verification%20flow/member.png?raw=true" text="Click here to view HIPPA verification flow for current caller type." />
      </div>
      <div v-if="callerType === 'Broker'">
        <HyperLink href="https://github.com/rybakatya/callScript/blob/main/images/verification%20flow/broker.png?raw=true" text="Click here to view HIPPA verification flow for current caller type." />
      </div>
      <div v-if="callerType === 'Other'">
        <HyperLink href="https://github.com/rybakatya/callScript/blob/main/images/verification%20flow/third_party.png?raw=true" text="Click here to view HIPPA verification flow for current caller type." />
      </div>


      <p v-if="callerType != 'Select'" class="text">
          <input v-model="verified" type="checkbox" /> Has HIPAA been verified for who you're speaking with?
      </p>
      <div v-if="callerType === 'Member' || callerType === 'Other'">

        <p v-if="callerType == 'Other'" class="text">
          <input v-model="verbalAuthObtained" type="checkbox"/> Was verbal auth obtained during this call?
 
            <div v-if="verbalAuthObtained === true">
              <label class="text">Authorized Party Name:</label>
              <input class="inputField" type="text"/>
            </div>
 
        </p>
        
        
        <div class="alertText">
          <input v-model="confirmedMedicalPlan" type="checkbox" />
          Verify plan effective date, plan end date, plan name, and PCP/Medical group name.
        </div>
        <p v-if="confirmedMedicalPlan">
          <span class="importantText"> Did caller state that anything you listed was incorrect?</span>
          <select v-model="memberConfirmedPlan">
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Skip</option>
          </select>
          <div v-if="memberConfirmedPlan === 'Skip'">
            <SkipQuestion />
          </div>
          <div v-if="memberConfirmedPlan === 'Yes'">
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
          <span class="importantText">Caller's response?</span>
          <select v-model="addressChangedResponse">
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Skip</option>
          </select>
          <div v-if="addressChangedResponse === 'Skip'">
            <SkipQuestion />
          </div>
          <div v-if="addressChangedResponse === 'Yes'">
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

        <br>
        <p v-if="stateInfo[selectedStateIndex][6] == true" class="importantText">
          We are offering a free 45-min assessment, this is when one of our providers come to your home to review medical history and ask a few questions, at the end of the assessment you are eligible for a $100 gift card. Is this something you would be interested in?
          <br>
          <br>
          <span class="boldWhite">Signify is the preferred vendor for all members, unless otherwise mentioned by the member or if Signify isn't serving the members state.</span>
          <br>
          <HyperLink href="https://cenpointprd.ad.wellcare.com/articles/fb0877b9-f21c-4bb1-8625-b1b453bc2356?row=1&memory=39378#:~:text=States-,Signify,-Health%3A%201" text="Click here for IHA vendor info" />
        </p>
      </div>

      
        <DeadAirTimer />
      
    </div>
  </div>

  <main>
  </main>
</template>

<style>
.boldWhite{
  color:whitesmoke;
  font-weight: bold;
}
.dropDown
{
  margin-right: 1vw;
  margin-left: 0.5vw;
  background-color: #2d2d2d;
  color:whitesmoke;
  outline: none;

}

.completionAlert
{
  font-weight: bold;
  color:aqua;
}

.secondaryCompletionAlert
{
  font-weight: bold;
  color:darkseagreen;
}
.inputField {
  background-color: #333; /* Dark background for the input area */
  color: #fff; /* Light text color */
  border: 1px solid #555; /* Border color */
  border-radius: 3px;
  padding: 3px;
  overflow-y: auto; /* Enable vertical scrollbar when text overflows */
  font-size: 16px;
  outline: none;
  margin-left: 0.5vh;
}

.inputField:focus {
  border-color: #777; /* Change border color when focused */
}
.dropDown:hover
{
  background-color: #444;
}
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
  top:50px;
}

.checkbox-group
{
  color: #f39c12; 
}

.stateInfo {
  width:400px;
  height:400px;;
}



</style>
