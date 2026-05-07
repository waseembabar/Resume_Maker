import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    activeTabIndex: 0,
    unlockedTabs: [0],
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      github: '',
      portfolio: '',
      location: '',
      jobTitle: '',
      aboutMe: ''
    },
    experience: [
      { company: '', role: '', startDate: '', endDate: '', location: '', description: '', isCurrent: false }
    ],
    education: [
      { institution: '', field: '', startDate: '', endDate: '', marks: '', location: '' }
    ],
    projects: [
      { name: '', startDate: '', endDate: '', company: '', techStack: '', description: '' }
    ],
    skills: [] 
  }),
  actions: {
    addExperience() { 
      this.experience.push({ company: '', role: '', startDate: '', endDate: '', location: '', description: '', isCurrent: false }) 
    },
    removeExperience(index) { 
      if (this.experience.length > 1) this.experience.splice(index, 1) 
    },
    
    addEducation() { 
      this.education.push({ institution: '', field: '', startDate: '', endDate: '', marks: '', location: '' }) 
    },
    removeEducation(index) { 
      if (this.education.length > 1) this.education.splice(index, 1) 
    },

    addProject() { 
      this.projects.push({ name: '', startDate: '', endDate: '', company: '', techStack: '', description: '' }) 
    },
    removeProject(index) { 
      if (this.projects.length > 1) this.projects.splice(index, 1) 
    }
  }
})