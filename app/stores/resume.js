// stores/resume.js
import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    activeTabIndex: 0,
    personalInfo: {},
    experience: [],
    education: [],
    projects: [],
    skills: [],
    resumeId: null // Store the ID after first save to update the same record
  }),
  
  actions: {
    async saveResumeData() {
      try {
        // Example using $fetch (Nuxt 3) or your preferred API client
        const response = await $fetch('/api/resume/save', {
          method: 'POST',
          body: {
            // Send the entire state or specific sections
            resumeId: this.resumeId,
            personalInfo: this.personalInfo,
            experience: this.experience,
            education: this.education,
            projects: this.projects,
            skills: this.skills
          }
        })
        
        if (response.id) {
          this.resumeId = response.id // Save ID for subsequent step updates
        }
        return true
      } catch (error) {
        console.error('Failed to save step:', error)
        return false
      }
    }
  }
})