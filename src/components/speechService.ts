// speechService.ts
export class SpeechService {
    private recognition: SpeechRecognition | null = null;
    private speechResultCallback: ((result: string) => void) | null = null;
  
    constructor() {
      if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported in this browser.');
        return;
      }
      this.recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
  
      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
  
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + ' ';
            if (this.speechResultCallback) {
              this.speechResultCallback(finalTranscript.trim());
            }
          } else {
            interimTranscript += result[0].transcript + ' ';
          }
        }
  
        // Optionally handle interim results if needed
        // console.log(interimTranscript.trim());
      };
  
      this.recognition.onerror = (event: SpeechRecognitionError) => {
        console.error("Speech recognition error:", event.error);
      };
  
      this.recognition.onend = () => {
        console.log("Speech recognition ended.");
      };
    }
  
    public startRecognition() {
      if (this.recognition && this.recognition.readyState === 0) {
        this.recognition.start();
      } else {
        console.warn("Speech recognition is already running.");
      }
    }
  
    public stopRecognition() {
      if (this.recognition) {
        this.recognition.stop();
      }
    }
  
    public onSpeechResult(callback: (result: string) => void) {
      this.speechResultCallback = callback;
    }
  }
  
  // Create an instance of the SpeechService
  export const speechService = new SpeechService();
  