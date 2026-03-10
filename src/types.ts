export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Text' | 'Image' | 'Code' | 'Analysis' | 'Project';
  type: 'component' | 'iframe' | 'external';
  component?: React.ComponentType;
  url?: string;
}

export type ToolCategory = AITool['category'] | 'All';
