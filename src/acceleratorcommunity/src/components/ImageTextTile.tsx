import {
  Text,
  NextImage,
  ImageField,
  Field,
  RichTextField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/imagetexttile.module.css';

type ImageTextTileProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  title: {
    jsonValue: Field<string>;
  };
  thumbnail: {
    jsonValue: ImageField;
  };
  description: {
    jsonValue: RichTextField;
  };
};

const ImageTextTileWithTopImage = (props: ImageTextTileProps) => {
  const { title, thumbnail, description } = props?.fields?.data?.datasource;
  return (
    <div className={`${styles['imagetext-container-responsive']}`}>
      <div className={styles['image-card-container']}>
        <div className={styles['float-layout']}>
          <div className={styles['image-text-top-image']}>
            <NextImage
              field={thumbnail?.jsonValue?.value}
              editable={true}
            />
            <div className={styles['image-text-top-image-text']}>
              <div className={styles['image-text-top-image-text-title']}>
                <Text field={title?.jsonValue} />
              </div>
              <div className={styles['image-text-top-image-text-description']}>
                <RichText field={description?.jsonValue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageTextTileWithLeftRightImage = (props: ImageTextTileProps) => {
  const { title, thumbnail, description } = props?.fields?.data?.datasource;
  return (
    <div className={`${styles['imagetext-container-responsive']} ${styles['section-inner']}`}>
      <div className={styles['image-card-container']}>
        <div className={styles['float-layout']}>
          <div className={styles['image-card-image']}>
            {props?.params?.RenderingView === 'ImageonLeft' && (
              <NextImage field={thumbnail?.jsonValue?.value} editable={true} />
            )}
            <div className={styles['card']}>
              <div
                className={
                  props?.params?.RenderingView === 'ImageonRight'
                    ? `${styles['margin-l']} ${styles['image-card-title']}`
                    : styles['image-card-title']
                }
              >
                <Text field={title?.jsonValue} />
              </div>
              <div
                className={
                  props?.params?.RenderingView === 'ImageonRight'
                    ? `${styles['margin-l']} ${styles['image-card-desc']}`
                    : styles['image-card-desc']
                }
              >
                <RichText field={description?.jsonValue} />
              </div>
            </div>
            {props?.params?.RenderingView === 'ImageonRight' && (
              <NextImage field={thumbnail?.jsonValue?.value} editable={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageTextTile = (props: ImageTextTileProps): JSX.Element => {
  if (props?.params?.RenderingView === 'ImageonTop') {
    return <ImageTextTileWithTopImage {...props} />;
  }
  return <ImageTextTileWithLeftRightImage {...props} />;
};

export default ImageTextTile;
