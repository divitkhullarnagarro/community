import styles  from '../assets/banner.module.css';




const Banner = (props: any): JSX.Element => (
  <div className={styles.container}>
    <img className={styles.img} src={props.imageBanner.preview}/>
    {/* <Text field={props.fields.heading} /> */}
  </div>
);

// export default withDatasourceCheck()<BannerProps>(Banner);
export default Banner;
