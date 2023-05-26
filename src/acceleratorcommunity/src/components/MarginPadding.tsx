import { ComponentProps } from 'lib/component-props';

export default function styleMarginPadding(props: ComponentProps) {
  var styleDiv = {};
  var marginValue = '';
  var boolMargin = false;
  var boolPadding = false;
  var paddingValue = '';
  if (
    props?.params?.MarginTop ||
    props?.params?.MarginRight ||
    props?.params?.MarginBottom ||
    props?.params?.MarginLeft
  ) {
    boolMargin = true;
  }
  if (
    props?.params?.PaddingRight ||
    props?.params?.PaddingBottom ||
    props?.params?.PaddingBottom ||
    props?.params?.PaddingLeft
  ) {
    boolPadding = true;
  }
  if (props?.params?.MarginTop) {
    marginValue = props?.params?.MarginTop.trim() + ' ';
  } else {
    marginValue = '0px ';
  }
  if (props?.params?.MarginRight) {
    marginValue = marginValue + props?.params?.MarginRight.trim() + ' ';
  } else {
    marginValue = marginValue + '0px ';
  }
  if (props?.params?.MarginBottom) {
    marginValue = marginValue + props?.params?.MarginBottom.trim() + ' ';
  } else {
    marginValue = marginValue + '0px ';
  }
  if (props?.params?.MarginLeft) {
    marginValue = marginValue + props?.params?.MarginLeft.trim();
  } else {
    marginValue = marginValue + '0px ';
  }
  if (props?.params?.PaddingTop) {
    paddingValue = props?.params?.PaddingTop.trim() + ' ';
  } else {
    paddingValue = '0px ';
  }
  if (props?.params?.PaddingRight) {
    paddingValue = paddingValue + props?.params?.PaddingRight.trim() + ' ';
  } else {
    paddingValue = paddingValue + '0px ';
  }
  if (props?.params?.PaddingBottom) {
    paddingValue = paddingValue + props?.params?.PaddingBottom.trim() + ' ';
  } else {
    paddingValue = paddingValue + '0px ';
  }
  if (props?.params?.PaddingLeft) {
    paddingValue = paddingValue + props?.params?.PaddingLeft.trim();
  } else {
    paddingValue = paddingValue + '0px ';
  }
  if (boolMargin && boolPadding) {
    styleDiv = {
      margin: marginValue,
      padding: paddingValue,
    };
  } else if (boolMargin) {
    styleDiv = {
      margin: marginValue,
    };
  } else if (boolPadding) {
    styleDiv = {
      padding: paddingValue,
    };
  }

  // console.log('margin', styleDiv);
  return styleDiv;
}
