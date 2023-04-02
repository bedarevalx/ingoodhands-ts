import Compressor from 'compressorjs';

const SIZES = {
  BIG: 4000000,
  NORMAL: 2000000,
  SMALL: 1000000,
};
export class FileLoaderHelper {
  constructor() {}
  getCompressedBase64 = async (file: File) => {
    return new Promise<string>(async (resolve, reject) => {
      const compressed = await this.compressPhoto(file);
      const base64: string = await this.blobToBase64(compressed);
      resolve(base64);
    });
  };

  getQualityOfFile = (size: number) => {
    if (size > SIZES.BIG) {
      return 0.6;
    }
    if (size > SIZES.NORMAL) {
      return 0.8;
    }
    if (size > SIZES.SMALL) {
      return 0.9;
    }
    return 1;
  };

  blobToBase64 = async (blob: Blob) =>
    new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

  compressPhoto = async (file: File) => {
    const quality = this.getQualityOfFile(file.size);
    return new Promise<File | Blob>((resolve, reject) => {
      new Compressor(file, {
        quality,
        success: (result) => {
          resolve(result);
        },
        error: () => {
          reject(null);
        },
      });
    });
  };
}
