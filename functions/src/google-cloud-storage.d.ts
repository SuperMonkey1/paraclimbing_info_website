// Type declarations to override problematic @google-cloud/storage types
declare module "@google-cloud/storage" {
  // Override or modify problematic types as needed
  export namespace Storage {
    namespace CRC32C {
      const CRC32C_EXTENSION_TABLE: unknown;
    }
  }
}
