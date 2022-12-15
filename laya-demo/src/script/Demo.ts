import Event = Laya.Event;

export default class Demo extends Laya.Scene {
  static instance: Demo;

  constructor() {
    super();
    Demo.instance = this;
    this.loadScene("DemoScene.json");
  }
  onEnable(): void {
    turbo.setPara({
      autoTrack: {
        appLaunch: true,
        appShow: true,
        appHide: true,
      },
      show_log: true,
    });
    turbo.init("gZGljPsq7I4wc3BMvkAUsevQznx1jahi", "your_client_id");
    this.scene.btn1.on(Event.CLICK, this, this.handleRegister);
    this.scene.btn2.on(Event.CLICK, this, this.handleEvent);
    this.scene.btn3.on(Event.CLICK, this, this.handleQueryUser);

    this.scene.btn4.on(Event.CLICK, this, this.handleProfileSet);
    this.scene.btn5.on(Event.CLICK, this, this.handleProfileSetOnce);
    this.scene.btn6.on(Event.CLICK, this, this.handleProfileIncrement);
    this.scene.btn7.on(Event.CLICK, this, this.handleProfileDelete);
    this.scene.btn8.on(Event.CLICK, this, this.handleProfileAppend);
    this.scene.btn9.on(Event.CLICK, this, this.handleProfileUnset);

    this.scene.btn10.on(Event.CLICK, this, this.handleRegisterApp);
    this.scene.btn11.on(Event.CLICK, this, this.handleRegisterEvent);
    this.scene.btn12.on(Event.CLICK, this, this.handleLoginEvent);
    this.scene.btn13.on(Event.CLICK, this, this.handleLogoutEvent);
    this.scene.btn14.on(Event.CLICK, this, this.handleCustomTrack);
  }
  //单击方法
  handleRegister(): void {
    turbo
      .register({
        name: "your_name",
        channel: "your_channel",
        version: 123,
        click_id: "your_click_id",
        wx_openid: "your_wx_openid",
        wx_unionid: "your_wx_unionid",
      })
      .then((res) => {
        console.log(res);
      });
  }
  handleEvent(): void {
    turbo
      .handleEvent({
        event_type: "pay",
        properties: {
          amount: 100,
          real_amount: 200,
        },
        timestamp: 1000,
        use_client_time: true,
        trace_id: "your_trace_id",
      })
      .then((res) => {
        console.log(res);
      });
  }
  handleQueryUser(): void {
    turbo.queryUser().then((res) => {
      console.log(res);
    });
  }
  handleProfileSet(): void {
    turbo.profileSet({
      $first_visit_time: "2022-09-10 11:12:13",
      friends_num: 1,
      arr: [1, 2],
      $name: "bob",
      $gender: "female",
      $signup_time: "2022-09-10 11:12:13",
    });
  }
  handleProfileSetOnce() {
    turbo.profileSetOnce({
      $first_visit_time: "2022-09-10 11:12:13",
    });
  }

  handleProfileIncrement() {
    turbo.profileIncrement({
      friends_num: 2,
    });
  }

  handleProfileDelete() {
    turbo.profileDelete();
  }

  handleProfileAppend() {
    turbo.profileAppend({
      arr: [3, 4],
    });
  }

  handleProfileUnset() {
    turbo.profileUnset("arr");
  }

  handleRegisterApp() {
    turbo.registerApp({
      test_register_app_key: "test_register_app_value",
    });
  }

  handleRegisterEvent() {
    turbo.registerEvent();
  }

  handleLoginEvent() {
    turbo.loginEvent();
  }

  handleLogoutEvent() {
    turbo.logoutEvent();
  }

  handleCustomTrack() {
    turbo.track("test", {
      $pay_type: "rmb",
    });
  }
}
