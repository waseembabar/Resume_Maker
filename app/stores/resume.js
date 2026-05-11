// stores/resume.js
import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    activeTabIndex: 0,
    selectedTemplateId: 'template-1',
    personalInfo: {
      profileImage: '',
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      github: '',
      portfolio: '',
      aboutMe: ''
    },
    experience: [{
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      isCurrent: false,
      description: ''
    }],
    education: [{
      institution: '',
      location: '',
      field: '',
      marks: '',
      startDate: '',
      endDate: '',
      isCurrent: false
    }],
    projects: [{
      name: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      techStack: '',
      description: ''
    }],
    skills: [],
    resumeId: null // Store the ID after first save to update the same record
  }),
  
  actions: {
    loadResumeData(content = {}, meta = {}) {
      this.personalInfo = {
        ...this.personalInfo,
        ...(content.personalInfo || {})
      }
      this.experience = Array.isArray(content.experience) && content.experience.length
        ? content.experience
        : this.experience
      this.education = Array.isArray(content.education) && content.education.length
        ? content.education
        : this.education
      this.projects = Array.isArray(content.projects) && content.projects.length
        ? content.projects
        : this.projects
      this.skills = Array.isArray(content.skills) ? content.skills : this.skills
      this.selectedTemplateId = content.templateId || this.selectedTemplateId
      this.resumeId = meta.resumeId || this.resumeId
    },

    setTemplate(templateId) {
      this.selectedTemplateId = templateId
    },

    addExperience() {
      this.experience.push({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        location: '',
        isCurrent: false,
        description: ''
      })
    },

    removeExperience(index) {
      if (this.experience.length === 1) {
        return
      }
      this.experience.splice(index, 1)
    },

    addEducation() {
      this.education.push({
        institution: '',
        location: '',
        field: '',
        marks: '',
        startDate: '',
        endDate: '',
        isCurrent: false
      })
    },

    removeEducation(index) {
      if (this.education.length === 1) {
        return
      }
      this.education.splice(index, 1)
    },

    addProject() {
      this.projects.push({
        name: '',
        company: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        techStack: '',
        description: ''
      })
    },

    removeProject(index) {
      if (this.projects.length === 1) {
        return
      }
      this.projects.splice(index, 1)
    },

    async saveResumeData(userId = 1) {
      try {
        const response = await $fetch('/api/resume/save', {
          method: 'POST',
          body: {
            userId,
            resumeId: this.resumeId,
            title: this.personalInfo.fullName
              ? `${this.personalInfo.fullName} Resume`
              : 'My Professional Resume',
            content: {
              templateId: this.selectedTemplateId,
              personalInfo: this.personalInfo,
              experience: this.experience,
              education: this.education,
              projects: this.projects,
              skills: this.skills
            }
          }
        })
        
        if (response?.resume?.id) {
          this.resumeId = response.resume.id
        }
        return true
      } catch (error) {
        console.error('Failed to save step:', error)
        return false
      }
    }
  }
})