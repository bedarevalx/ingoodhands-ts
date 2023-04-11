import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { classNamesParser } from '../../../../helpers/classNamesParser';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { APP_CONSTANTS } from '../../../../constants/app';
import { FileLoaderHelper } from '../../../../helpers/fileLoaderHelper';

export interface IFileLoaderProps {
  classNames?: string[];
  onLoadFiles?: (base64Files: string[]) => void;
}

const FileLoader = (props: IFileLoaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleLoaderClick = () => {
    inputRef.current && inputRef.current.click();
  };
  const dropZoneRef = React.useRef<null | HTMLDivElement>(null);
  const fileLoader = new FileLoaderHelper();

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setIsDragging(true);
    } else if (event.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    //@ts-ignore
    const files = [...event.dataTransfer.files];
    if (files.length > 0) {
      const compressedFiles = [];
      for (const file of files) {
        if (file.type.match(/image.*/))
          compressedFiles.push(await fileLoader.getCompressedBase64(file));
      }

      props.onLoadFiles && props.onLoadFiles(compressedFiles);
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    const files = [...event.target.files];
    if (files.length > 0) {
      const compressedFiles = [];
      for (const file of files) {
        if (file.type.match(/image.*/))
          compressedFiles.push(await fileLoader.getCompressedBase64(file));
      }
      props.onLoadFiles && props.onLoadFiles(compressedFiles);
    }
  };

  return (
    <>
      <div
        className={classNamesParser('file-loader', props.classNames)}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        ref={dropZoneRef}
        onClick={handleLoaderClick}>
        <PhotoSizeSelectActualOutlinedIcon className='file-loader__image-icon' />
        <p className='file-loader__instruction'>
          {!isDragging
            ? 'Нажмите сюда или перетащите фото для загрузки'
            : 'Отпустите, чтобы загрузить фото'}
        </p>
        <p className='file-loader__max-count'>
          максимальное число фотографий - {APP_CONSTANTS.MAX_PHOTO_COUNT}
        </p>
        <input
          ref={inputRef}
          multiple
          max={5}
          accept='image/*'
          className='file-loader__input'
          onChange={handleInputChange}
          type='file'
        />
      </div>
    </>
  );
};

export default FileLoader;
