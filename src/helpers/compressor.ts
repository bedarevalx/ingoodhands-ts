import Compressor from 'compressorjs';

const sizes = {
  big: 4000000,
  normal: 2000000,
  small: 1000000,
};

export const compressPhoto = (file: File) => {
  const quality = getQuality(file.size);
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

const getQuality = (size: number) => {
  if (size > sizes.big) {
    return 0.6;
  }
  if (size > sizes.normal) {
    return 0.8;
  }
  if (size > sizes.small) {
    return 0.9;
  }
  return 1;
};
