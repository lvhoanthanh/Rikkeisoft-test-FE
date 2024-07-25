import React, { useState, useEffect } from 'react';
import { Modal, Upload, UploadProps, UploadFile, GetProp } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import Utils from '@utils';

interface IUploadImageProps {
  onChangeAvatar(id?: string | null): void;
  file?: UploadFile;
  endpoint: 'qr-code' | 'company-logo' | 'advertisement' | 'blog-cover-media';
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const UploadImage: React.FC<IUploadImageProps> = ({
  onChangeAvatar,
  file,
  endpoint,
}) => {
  const userToken = Utils.getSavedToken();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [renderKey, setRenderKey] = useState(Math.random());

  useEffect(() => {
    if (file) setRenderKey(Math.random());
  }, [file]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview)
      file.preview = await Utils.getImageBase64(file.originFileObj as FileType);
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleOnChangeAvatar: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done')
      onChangeAvatar(info.file.response?.payload?.id);
  };

  const checkName = () => {
    switch (endpoint) {
      case 'qr-code':
        return 'qrCode';
      case 'company-logo':
        return 'companyLogo';
      case 'blog-cover-media':
        return 'blogCoverMedia'
      default:
        return 'advertisementImage';
    }
  };

  return (
    <>
      <ImgCrop rotationSlider aspectSlider showReset>
        <Upload
          listType="picture-card"
          onPreview={handlePreview}
          maxCount={1}
          key={renderKey}
          accept="image/png, image/jpeg"
          method="POST"
          defaultFileList={file ? [file] : []}
          name={checkName()}
          headers={{ Authorization: `Bearer ${userToken}` }}
          action={`${import.meta.env.VITE_BE_URL}api/files/upload/${endpoint}`}
          onChange={handleOnChangeAvatar}
          onRemove={() => onChangeAvatar(null)}

        >
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImage;
