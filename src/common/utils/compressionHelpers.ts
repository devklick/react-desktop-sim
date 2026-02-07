import pako from "pako";

export function compress(data: string): Uint8Array {
  return pako.deflate(data);
}

export function decompress(data: Uint8Array) {
  return pako.inflate(data, { to: "string" });
}
