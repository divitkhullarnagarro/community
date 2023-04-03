import SideBarCss from '../assets/sidebar.module.css';

const SideBar = (props: any): JSX.Element => (
  <div>
    {console.log('data', props.buttonTypes)}
    <div className={props.scroll ? SideBarCss.sideNavTop : SideBarCss.sideNav}>
      {props.buttonTypes?.length > 0 ? (
        <button
          onClick={props.handleAllClick}
          className={
            props.bookmarkTYpeClicked?.includes('all')
              ? SideBarCss.activeBtn
              : SideBarCss.actionBtn
          }
        >
          ALL
        </button>
      ) : (
        ''
      )}
      {props.buttonTypes?.length > 0
        ? props.buttonTypes.map((item: any) => {
            return (
              <button
                onClick={() => props.handleClick(item?.fields?.Name?.value?item?.fields?.Name?.value:item?.name_f18b1a9ad1ff4c13ad6080a2f710e438?.jsonValue?.value)}
                className={
                  props.bookmarkTYpeClicked?.includes(item?.fields?.Name?.value?item?.fields?.Name?.value:item?.name_f18b1a9ad1ff4c13ad6080a2f710e438?.jsonValue?.value)
                    ? SideBarCss.activeBtn
                    : SideBarCss.actionBtn
                }
              >
                {item?.fields?.Name?.value
                  ? item?.fields?.Name?.value
                  : item?.name_f18b1a9ad1ff4c13ad6080a2f710e438?.jsonValue?.value}
              </button>
            );
          })
        : ''}
    </div>
  </div>
);

export default SideBar;

// export default withDatasourceCheck()<SideBarProps>(SideBar);
