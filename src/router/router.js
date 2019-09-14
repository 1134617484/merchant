
import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/menuList",
      name: "menuList",
      component: () => import("../views/Menu/MenuList.vue"),
      meta: {
        isLoginToken: true // 登录验证token
      },
      children: [
        {
          path: "/index",
          name: "start",
          meta: {
            // isLoginToken: true
          },
          component: () =>
            import("../views/Index/Index.vue")
        },
        {
          path: "/order",
          name: "order",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/OrderManage/OrderList/OrderList.vue")
        },
        {
          // 资金变动
          path: "/account-change",
          name: "account-change",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/FinanceManage/AccountChange/AccountChange.vue")
        },
        {
          // 提现记录
          path: "/cash-log",
          name: "cash-log",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/FinanceManage/CashLog/CashLog.vue")
        },
        {
          path: "/order/success",
          name: "success",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/OrderManage/SuccessList/SuccessList.vue")
        },
        {
          path: "/order/pending",
          name: "pending",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/OrderManage/PendingList/PendingList.vue")
        },
        {
          path: "/order/fail",
          name: "fail",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/OrderManage/FailList/FailList.vue")
        },
        {
          path: "/order/frozen",
          name: "frozen",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/OrderManage/FrozenList/FrozenList.vue")
        },
        {
          path: "/qrcode",
          name: "qrcode",
          meta: {
            isLoginToken: true
          },
          component: () => import("../views/QrcodeManage/QrcodeManage/QrcodeManage.vue")
        },
        //管理员列表
        {
          path: "/admin",
          name: "ManageList",
          meta: {
            isLoginToken: true
          },
          component: () => import("../views/Manage/ManageList/ManageList.vue")
        },
        //角色管理
        {
          path: "/role",
          name: "RoleList",
          meta: {
            isLoginToken: true
          },
          component: () => import("../views/Manage/RoleList/RoleList.vue")
        },
        {
          path: "/assignRoleList",
          name: "assignRoleList",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/Manage/AssignRoleList/AssignRoleList.vue")
        },
        //权限管理
        {
          path: "/permission",
          name: "accessConfig",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/Manage/AccessConfig/AccessConfig.vue")
        },
        {
          // app管理
          path: "/app",
          name: "appManage",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/ChannelManage/AppManage/AppManage.vue")
        },
        {
          // 通道管理
          path: "/channel",
          name: "channel",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/ChannelManage/ChanelManage/ChanelManage.vue")
        },
        {
          // 通道产品
          path: "/product",
          name: "product",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/ChannelManage/ProductManage/ProductManage.vue")
        },
        {
          // 子账户
          path: "/childAcount",
          name: "childAcount",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/ChannelManage/ChildManage/ChildManage.vue")
        },
        {
          // 基本设置
          path: "/basic",
          name: "basicSetup",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/BasicSetup/BasicSetup.vue")
        },
        {
          // 邮件设置
          path: "/email",
          name: "emailSetting",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/EmailSetting/EmailSetting.vue")
        },
        {
          // 计划任务
          path: "/scheduleTask",
          name: "scheduleTask",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/ScheduleTask/ScheduleTask.vue")
        },
        {
          // 手机设置
          path: "/sms",
          name: "mobilePhoneSet",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/MobilePhoneSet/MobilePhoneSet.vue")
        },
        {
          // 修改密码
          path: "/admin/reset",
          name: "changePwd",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/ChangePwd/ChangePwd.vue")
        },
        {
          // 短信设置
          path: "/messageSet",
          name: "messageSet",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/MessageSet/MessageSet.vue")
        },
        {
          // 风控设置
          path: "/transaction",
          name: "transaction",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/TransactionSet/TransactionSet.vue")
        },
        {
          // 风控设置
          path: "/cash",
          name: "cash",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/SystemSettings/CashSet/CashSet.vue")
        },
        {
          // 商户列表
          path: "/merchant/authorized",
          name: "accountManage",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/BusinessManage/AccountManage/AccountManage.vue")
        },
        {
          // 商户日志
          path: "/merchant-log",
          name: "merchant-log",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/BusinessManage/LogManage/LogManage.vue")
        },
        {
          // 商户待认证
          path: "/merchant/wait",
          name: "WaitManage",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/BusinessManage/WaitManage/WaitManage.vue")
        },
        {
          // 商户未认证
          path: "/merchant/unauthorized",
          name: "unauthorizManage",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/BusinessManage/UnauthManage/UnauthManage.vue")
        },
        {
          // 登录日志
          path: "/admin-log",
          name: "admin-log",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/Manage/LogManage/LogManage.vue")
        },
        {
          //交易统计
          path: "/finance-trade",
          name: "finance-trade",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/DataReport/UserTradeTotal/UserTradeTotal.vue")
             
        },
        {
          //商户交易统计
          path: "/finance/user-trade",
          name: "user-trade",
          meta: {
            isLoginToken: true
          },
          component: () =>
          import("../views/DataReport/FinanceTotal/FinanceTotal.vue")   
        },
        {
          //商户报表
          path: "/finance-merchant",
          name: "finance-merchant",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/DataReport/MerchantReport/MerchantReport.vue")
        },
        {
          //平台报表
          path: "/finance/platform",
          name: "/finance/platform",
          meta: {
            isLoginToken: true
          },
          component: () =>
            import("../views/DataReport/PlatformReport/PlatformReport.vue")
        },
      ]
    }
  ]
});
