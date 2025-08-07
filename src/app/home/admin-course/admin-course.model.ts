export interface Course {
    courseId: number;
    title: string;
    description: string;
    contentUrl: string;
    assignments : any[];
  }
   
  export interface Assignment {
    assessmentId: number;
    type: string;
    maxScore: number;
  }