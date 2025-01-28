
export interface Agent {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    costing: string;
  }
  
  export type CategoryAgents = {
    [key: string]: Agent[];
  };