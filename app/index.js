'use strict';
const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  async prompting() {

    const prompts = [
      {
        type: 'confirm',
        name: 'folder level confirm',
        message: 'Are you in right container that contain with css|js|html folder?',
        default: true

      },
      //重新命名文件
      {
        type: 'input',
        name: 'filename',
        message: 'Please input your files name',
        default: 'index'
      },
      //网页标题设置
      {
        type: 'input',
        name: 'title',
        message: 'Please input your page title',
        default: ''
      },
       //选择开发模式
      {
        type: 'confirm',
        name: 'mobile',
        message: 'Are you developing on Mobile platform?',
        default: true
      },
	  //选择要使用的库工具
	  {
		  type: 'checkbox',
		  name: 'libraries',
      message: 'Selecting your library below that you want to including',
      choices:[{
        name: 'zepto.js(dom maniplate library)',
        value: 'http://app.hcbkeji.com/activity/HcbCdnScripts/zepto.js',
        checked: true
      },
      {
        name: 'wxapi.js(wx api)',
        value: 'http://app.hcbkeji.com/activity/HcbCdnScripts/wx.js',
        checked: false
      },
      {
        name: 'juicer.js(html engine)',
        value: 'http://app.hcbkeji.com/activity/HcbCdnScripts/juicer.js',
        checked: false
      }
    ]}
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {//重写新建文件名
    //不再正确得目录下退出
    if(this.props.confirm === false) return;
    const fileTypes = ['html', 'css', 'js'];
    for (let len = 0; len < fileTypes.length; len++) {
      let type = fileTypes[len];
      this.fs.copyTpl(
        this.templatePath(`indexnew.${type}`),
        this.destinationPath(`${type}/${this.props.filename}.${type}`),
        {...this.props}
      );
    }
  }
  end() {
    this.log('You have created a mobile web page, coding now!');
  }
};
