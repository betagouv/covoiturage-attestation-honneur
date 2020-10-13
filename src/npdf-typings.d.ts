// make pdf files usable with import statement
declare module '*.pdf' {
  const value: any;
  export default value;
}
