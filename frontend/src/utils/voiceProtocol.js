/**
 * voiceProtocol.js - Tactical Voice Assistant Layer
 * Part of LogiMind AI - Resilient Logistics
 * Built for Google Solution Challenge 2026
 */

class VoiceProtocol {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voice = null;
        this.isSupported = 'speechSynthesis' in window;

        if (this.isSupported) {
            // Load voices
            this.loadVoices();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = () => this.loadVoices();
            }
        }
    }

    loadVoices() {
        const voices = this.synth.getVoices();
        // Prefer a "Tactical" sounding voice - often "Google UK English Male" or similar
        this.voice = voices.find(v => v.name.includes('Google UK English Male')) ||
                     voices.find(v => v.lang === 'en-GB') ||
                     voices[0];
    }

    speak(text, priority = 'normal') {
        if (!this.isSupported) return;

        // Cancel existing speech if priority is high
        if (priority === 'high') {
            this.synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.voice;
        utterance.pitch = 0.85; // Slightly deeper for tactical feel
        utterance.rate = 1.0;   // Standard pace
        utterance.volume = 1.0;

        this.synth.speak(utterance);
    }

    stop() {
        if (this.isSupported) {
            this.synth.cancel();
        }
    }
}

export const voiceAssistant = new VoiceProtocol();
