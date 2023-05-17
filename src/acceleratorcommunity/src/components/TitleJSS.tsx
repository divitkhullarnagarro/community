import React from 'react';
import {
  Link,
  Text,
  useSitecoreContext,
  LinkField,
  TextField,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  data: {
    datasource: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      title?: {
        jsonValue: Field<string>;
      };
      description?: {
        jsonValue: Field<string>;
      };
    };
    contextItem: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
  };
}

// params: { [key: string]: string };

type TitleProps = {
  fields: Fields;
};

// type ComponentContentProps = {
//   id: string;
//   styles: string;
//   children: JSX.Element;
// };

// const ComponentContent = (props: ComponentContentProps) => {
//   const id = props.id;
//   return (
//     <div className={`component title ${props.styles}`} id={id ? id : undefined}>
//       <div className="component-content">
//         <div className="field-title">{props.children}</div>
//       </div>
//     </div>
//   );
// };

const TitleJSS = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  const { sitecoreContext } = useSitecoreContext();

  const text: TextField = {
    value: datasource?.field?.jsonValue?.value,
    editable: datasource?.field?.jsonValue?.editable,
  };

  const link: LinkField = {
    value: {
      href: datasource?.url?.path,
      title: datasource?.field?.jsonValue?.value,
      editable: true,
    },
  };
  if (sitecoreContext.pageState !== 'normal') {
    link.value.querystring = `sc_site=${datasource?.url?.siteName}`;
    if (!text.value) {
      text.value = 'Title field';
      link.value.href = '#';
    }
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <p>TitleJSS Component</p>
      <>
        {sitecoreContext.pageState === 'edit' ? (
          <Text field={text} />
        ) : (
          <Link field={link}>
            <Text field={text} />
          </Link>
        )}
      </>
      {/* <Text field={text2} editable={true} />
      <br />
      <Text field={text2} /> */}
      <br />
      Title : <Text field={props?.fields?.data?.datasource?.title?.jsonValue} editable={true} />
      <br />
      Title(Editable:"empty") : <Text field={props?.fields?.data?.datasource?.title?.jsonValue} />
      <div>
        <span>Description : </span>
        <span>
          <Text field={props?.fields?.data?.datasource?.description?.jsonValue} />
        </span>
      </div>
    </div>
  );
};

export default TitleJSS;
