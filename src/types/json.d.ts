declare module '*.json' {
  const value: Array<{
    id: number;
    tag: string;
    title: string;
    content: string;
    image: string;
  }>;
  export default value;
}