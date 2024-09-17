import type { Schema, Attribute } from '@strapi/strapi';

export interface ExperienceExperience extends Schema.Component {
  collectionName: 'components_experience_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    title: Attribute.String;
    companyName: Attribute.String;
    state: Attribute.String;
    city: Attribute.String;
    startDate: Attribute.String;
    endDate: Attribute.String;
    workSummery: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'experience.experience': ExperienceExperience;
    }
  }
}
