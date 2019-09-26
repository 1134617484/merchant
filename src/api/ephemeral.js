 const menu_list={
  '/index':['管理中心','管理首页'],

  '/qrcode':['充值入口','充值二维码'],
  '/link':['充值入口','充值链接'],

  '/transaction':['账户管理','基本信息'],
  '/admin':['账户管理','银行卡管理'],
  '/permission':['账户管理','认证信息'],
  '/admin':['账户管理','银行卡管理'],
  '/admin/reset':['账户管理','登录密码'],
  '/admin/reset_pay':['账户管理','支付密码'],
  '/admin-log':['账户管理','登录记录'],

  '/account-change':['财务管理','资金记录'],
  '/account-analysis':['财务管理','通道分析'],
  '/account-detailss':['财务管理','保证金明细'],
  '/cash-log':['财务管理','冻结资金明细'],

  '/finance/user-trade':['结算管理','结算记录'],
  '/email':['结算管理','结算申请'],

  '/order':['订单管理','所有订单'],
  '/order/success':['订单管理','成功订单'],
  '/order/fail':['订单管理','手工补发'],
  '/order/pending':['订单管理','未支付订单'],

  '/complain':['投诉管理','投诉记录'],
  '/appeal':['投诉管理','申诉记录'],

  '/api/rate':['API管理','查看通道费率'],
  '/api/doc':['API管理','API开发文档'],
  
}
//  临时数据
export const ephemeral_data = {
  menu: {
    menulist: {
      data: [
        // 首页
        {
          menu_name: "index.index",
          // "label":"首页",
          label: "管理中心",
          icon: "icon-shouye",
          menu_uri: "",
          
          children: [
            // 暂无
            {
              menu_name: "index.start",
              label: "管理首页",
              icon: "icon",
              menu_uri: "/index",
              children: [],
              index: "1-1"
            }
          ],
          index: '管理中心'
        },
        // 充值入口
        {
          menu_name: "system.system",
          label: "充值入口",
          // "label":"系统设置",
          icon: "icon-chongzhi",
          menu_uri: "",
          children: [
            {
              menu_name: "admin.reset",
              label: "充值二维码",
              icon: "icon",
              menu_uri: "/qrcode",
              children: [],
              index: "2-1"
            },
            {
              menu_name: "basic.index",
              label: "充值链接",
              icon: "icon",
              menu_uri: "/link",
              children: [],
              index: "2-2"
            },
            
          ],
          index:'充值入口'
        },

        // 账户管理
        {
          menu_name: "admin.admin",
          // "label":"管理员管理",
          label: "账户管理",
          icon: "icon-zhanghuguanli",
          menu_uri: "",
          children: [
            
            {
              menu_name: "transaction.index",
              label: "基本信息",
              icon: "icon",
              menu_uri: "/transaction",
              children: [],
              index: "3-1"
            },
            {
              menu_name: "admin.index",
              label: "银行卡管理",
              icon: "icon",
              menu_uri: "/admin",
              children: [],
              index: "3-2"
            },
            // 暂无
            {
              menu_name: "permission.index",
              label: "认证信息",
              icon: "icon",
              menu_uri: "/permission",
              children: [],
              index: "3-3"
            },
            
        {
          menu_name: "admin.reset",
          label: "登录密码",
          icon: "icon",
          menu_uri: "/admin/reset",
          children: [],
          index: "3-4"
        },
        {
          menu_name: "admin.reset_pay",
          label: "支付密码",
          icon: "icon",
          menu_uri: "/admin/reset_pay",
          children: [],
          index: "3-5"
        },
            {
              menu_name: "admin-log.index",
              label: "登录记录",
              icon: "icon",
              menu_uri: "/admin-log",
              children: [],
              index: "3-6"
            }
          ],
          index: '账户管理'
        },
        // 财务管理
        {
          menu_name: "finace.finace",
          label: "财务管理",
          icon: "icon-caiwuguanli1",
          menu_uri: "",
          children: [
            {
              menu_name: "account-change.index",
              label: "资金记录",
              icon: "icon",
              menu_uri: "/account-change",
              children: [],
              index: "4-1"
            },
            {
              menu_name: "account-analysis.index",
              label: "通道分析",
              icon: "icon",
              menu_uri: "/account-analysis",
              children: [],
              index: "4-2"
            },
            {
              menu_name: "account-detailss.index",
              label: "保证金明细",
              icon: "icon",
              menu_uri: "/account-detailss",
              children: [],
              index: "4-3"
            },
            {
              menu_name: "cash-log.index",
              label: "冻结资金明细",
              icon: "icon",
              menu_uri: "/cash-log",
              text:['财务管理','冻结资金明细'],
              children: [],
              index: "4-4"
            }
          ],
          index: '财务管理'
        },
        // 结算管理
        {
          menu_name: "statistics.statistics",
          // "label":"数据报表",
          label: "结算管理",
          icon: "icon-caiwuguanli",
          menu_uri: "",
          children: [
            {
              menu_name: "finance.userTrade",
              label: "结算记录",
              icon: "icon",
              menu_uri: "/finance/user-trade",
              children: [],
              index: "5-1"
            },
            {
              menu_name: "emailSetting",
              label: "结算申请",
              icon: "icon",
              menu_uri: "/email",
              children: [],
              index: "5-3"
            },
            
          ],
          index: '结算管理'
        },
        // 订单管理
        {
          menu_name: "order.order",
          label: "订单管理",
          icon: "icon-dingdanguanli",
          menu_uri: "",
          children: [
            {
              menu_name: "order.index",
              label: "所有订单",
              icon: "icon",
              menu_uri: "/order",
              children: [],
              index: "6-1"
            },
            {
              menu_name: "order.success",
              label: "成功订单",
              icon: "icon",
              menu_uri: "/order/success",
              children: [],
              index: "6-2"
            },
            {
              menu_name: "order.fail",
              label: "手工补发",
              icon: "icon",
              menu_uri: "/order/fail",
              children: [],
              index: "6-3"
            },
            {
              menu_name: "order.pending",
              label: "未支付订单",
              icon: "icon",
              menu_uri: "/order/pending",
              children: [],
              index: "6-4"
            }
          ],
          index: '订单管理'
        },
        // 投诉模块
        {
          menu_name: "system.system",
          label: "投诉管理",
          // "label":"系统设置",
          icon: "icon-tousuxingjiancha",
          menu_uri: "",
          children: [
            {
              menu_name: "admin.reset",
              label: "投诉记录",
              icon: "icon",
              menu_uri: "/complain",
              children: [],
              index: "7-1"
            },
            {
              menu_name: "basic.index",
              label: "申诉记录",
              icon: "icon",
              menu_uri: "/appeal",
              children: [],
              index: "7-2"
            },
          ],
          index: '投诉管理'
        },
         // api管理
         {
          menu_name: "api.system",
          label: "API管理",
          icon: "icon-tousuxingjiancha",
          menu_uri: "",
          children: [
            {
              menu_name: "admin.reset",
              label: "查看通道费率",
              icon: "icon",
              menu_uri: "/api/rate",
              children: [],
              index: "8-1"
            },
            {
              menu_name: "basic.index",
              label: "API开发文档",
              icon: "icon",
              menu_uri: "/api/doc",
              children: [],
              index: "8-2"
            },
          ],
          index: 'API管理'
        },
      ],
      code: 200,
      message: "成功"
    },
    menu_type_list:menu_list,
    index: {
      data: {
        month_pay_actual_amount: "0.0000",
        month_pending_amount: "0.0000",
        month_pending_count: 0,
        month_platform_amount: "0.0000",
        month_success_amount: "0.0000",
        month_success_count: 0,
        today_pay_actual_amount: "0.0000",
        today_pending_amount: "0.0000",
        today_pending_count: 0,
        today_platform_amount: "0.0000",
        today_success_amount: "0.0000",
        today_success_count: 0,
        total_pay_actual_amount: "0.0000",
        total_pending_amount: "0.0000",
        total_pending_count: 0,
        total_platform_amount: "0.0000",
        total_success_amount: "0.0000",
        total_success_count: 0,
        week_pay_actual_amount: "0.0000",
        week_pending_amount: "0.0000",
        week_pending_count: 0,
        week_platform_amount: "0.0000",
        week_success_amount: "0.0000",
        week_success_count: 0
      },
      code: 200,
      message: "\u6210\u529f"
    },
    day: {
      data: {
        time: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
          "00:00"
        ],
        result: [
          {
            name: "\u5f85\u652f\u4ed8\u8ba2\u5355",
            type: "line",
            stack: "\u603b\u91cf",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            name: "\u6210\u529f\u8ba2\u5355",
            type: "line",
            stack: "\u603b\u91cf",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          },
          {
            name: "\u5f02\u5e38\u8ba2\u5355",
            type: "line",
            stack: "\u603b\u91cf",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0
            ]
          }
        ]
      },
      code: 200,
      message: "\u6210\u529f"
    },
    transaction:{"data":{"min_money":"3","max_money":"14.332","all_money":"10.55","start_time":"09:00","end_time":"02:00","unit_interval":"2","time_unit":"60","unit_number":"234","unit_all_money":"0.2","status":"1"},"code":200,"message":"\u6210\u529f"},
    admin:{"data":{"current_page":1,"data":[{"id":1,"role_id":1,"name":"mark11","mobile":"13266522721","email":"9952@qq.com","status":1,"last_login_at":1568599534,"last_login_ip":"119.137.54.50"},{"id":2,"role_id":1,"name":"lily","mobile":"13266596863","email":"6635@qq.com","status":1,"last_login_at":1568110035,"last_login_ip":"127.0.0.1"},{"id":3,"role_id":1,"name":"fdsf","mobile":"","email":"fdsf@ww.com","status":1,"last_login_at":0,"last_login_ip":""},{"id":10,"role_id":1,"name":"mmmd","mobile":"15324321143","email":"123321@qq.com","status":1,"last_login_at":1566955024,"last_login_ip":"127.0.0.1"},{"id":24,"role_id":1,"name":"test24311","mobile":"15324321141","email":"test11@qq.com","status":1,"last_login_at":1565342608,"last_login_ip":"127.0.0.1"},{"id":25,"role_id":5,"name":"4343111","mobile":"15324332933","email":"434334114@qq.com","status":1,"last_login_at":1565342904,"last_login_ip":"127.0.0.1"},{"id":26,"role_id":1,"name":"lily111","mobile":"15324332944","email":"434334@ss.com","status":1,"last_login_at":1565926664,"last_login_ip":"127.0.0.1"},{"id":28,"role_id":7,"name":"4343111xxx","mobile":"15324332936","email":"434334114xxxxy@qq.com","status":1,"last_login_at":1565685775,"last_login_ip":"127.0.0.1"},{"id":29,"role_id":3,"name":"one22","mobile":"15324332222","email":"one22@one.com","status":1,"last_login_at":1566552533,"last_login_ip":"127.0.0.1"},{"id":30,"role_id":2,"name":"one224","mobile":"15324332244","email":"one2244@one.com","status":1,"last_login_at":1566552558,"last_login_ip":"127.0.0.1"},{"id":31,"role_id":4,"name":"one22t","mobile":"15324332233","email":"one22t@one.com","status":1,"last_login_at":1566553331,"last_login_ip":"127.0.0.1"},{"id":32,"role_id":1,"name":"\u67ef\u743c\u5f663","mobile":"13266522722","email":"123@qq.com","status":1,"last_login_at":1566554079,"last_login_ip":"192.168.2.9"},{"id":33,"role_id":2,"name":"\u67ef\u743c\u5f66312432","mobile":"17665045940","email":"123123@qq.com","status":1,"last_login_at":1566555412,"last_login_ip":"192.168.2.9"},{"id":34,"role_id":2,"name":"1111111","mobile":"17874329177","email":"115@qq.com","status":1,"last_login_at":1567062558,"last_login_ip":"192.168.2.9"},{"id":35,"role_id":4,"name":"354345","mobile":"17665045941","email":"131@qq.com","status":1,"last_login_at":1567062818,"last_login_ip":"192.168.2.9"}],"first_page_url":"https:\/\/api.emide.cn\/api\/admin?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/admin?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/admin","per_page":20,"prev_page_url":null,"to":15,"total":15},"code":200,"message":"\u6210\u529f"},
    admin_select:{"data":[{"id":1,"name":"\u8d85\u7ea7\u7ba1\u7406\u5458"},{"id":2,"name":"\u52a9\u7406\u7ba1\u7406\u5458"},{"id":3,"name":"\u8d22\u52a1\u7ba1\u7406\u545812111"},{"id":4,"name":"\u7814\u53d1\u7ba1\u7406\u5458"},{"id":5,"name":"\u666e\u901a\u5546\u6237"},{"id":7,"name":"\u6e38\u5ba2"},{"id":9,"name":"\u5ba2\u670d\u4eba\u5458"},{"id":27,"name":"\u8fd0\u8425\u7ba1\u7406\u5458"},{"id":28,"name":"\u6f14\u793a\u4eba\u5458"},{"id":29,"name":"\u6d4b\u8bd5\u89d2\u8272"},{"id":30,"name":"\u6d4b\u8bd5"}],"code":200,"message":"\u6210\u529f"},
    permission:{"data":{"current_page":1,"data":[{"id":1,"icon":"icon","menu_name":"index.index","title":"\u9996\u9875","pid":0,"is_menu":1,"level":1,"sort":1},{"id":2,"icon":"icon","menu_name":"system.system","title":"\u7cfb\u7edf\u8bbe\u7f6e","pid":0,"is_menu":1,"level":1,"sort":1},{"id":3,"icon":"icon","menu_name":"admin.admin","title":"\u7ba1\u7406\u5458\u7ba1\u7406","pid":0,"is_menu":1,"level":1,"sort":1},{"id":4,"icon":"icon","menu_name":"users.user","title":"\u5546\u6237\u7ba1\u7406","pid":0,"is_menu":1,"level":1,"sort":2},{"id":5,"icon":"icon","menu_name":"agent.agent","title":"\u901a\u9053\u7ba1\u7406","pid":0,"is_menu":1,"level":0,"sort":3},{"id":6,"icon":"icon","menu_name":"order.order","title":"\u8ba2\u5355\u7ba1\u7406","pid":0,"is_menu":1,"level":1,"sort":1},{"id":7,"icon":"icon","menu_name":"statistics.statistics","title":"\u6570\u636e\u62a5\u8868","pid":0,"is_menu":1,"level":1,"sort":1},{"id":8,"icon":"icon","menu_name":"code.code","title":"\u6536\u6b3e\u7801\u7ba1\u7406","pid":0,"is_menu":1,"level":1,"sort":4},{"id":9,"icon":"icon","menu_name":"finace.finace","title":"\u8d22\u52a1\u7ba1\u7406","pid":0,"is_menu":1,"level":1,"sort":4},{"id":10,"icon":"icon","menu_name":"account.store","title":"\u65b0\u589e\u5b50\u8d26\u53f7","pid":0,"is_menu":0,"level":1,"sort":1},{"id":11,"icon":"icon","menu_name":"account.index","title":"\u5b50\u8d26\u53f7\u5217\u8868","pid":48,"is_menu":0,"level":1,"sort":1},{"id":12,"icon":"icon","menu_name":"account-change.index","title":"\u8d44\u91d1\u53d8\u52a8","pid":9,"is_menu":1,"level":1,"sort":1},{"id":13,"icon":"icon","menu_name":"product.status","title":"\u4ea7\u54c1\u72b6\u6001","pid":108,"is_menu":0,"level":1,"sort":1},{"id":14,"icon":"icon","menu_name":"account.show","title":"\u5b50\u8d26\u53f7\u5c55\u793a","pid":48,"is_menu":0,"level":1,"sort":1},{"id":15,"icon":"icon","menu_name":"account.update","title":"\u5b50\u8d26\u53f7\u66f4\u65b0","pid":48,"is_menu":0,"level":1,"sort":1},{"id":16,"icon":"icon","menu_name":"account.destroy","title":"\u5b50\u8d26\u53f7\u5220\u9664","pid":48,"is_menu":0,"level":1,"sort":1},{"id":17,"icon":"icon","menu_name":"accountrate.show","title":"\u5b50\u8d26\u53f7\u8d39\u7387\u4fe1\u606f","pid":48,"is_menu":0,"level":1,"sort":1},{"id":18,"icon":"icon","menu_name":"accountrate.update","title":"\u66f4\u65b0\u5b50\u8d26\u53f7\u8d39\u7387","pid":48,"is_menu":0,"level":1,"sort":1},{"id":19,"icon":"icon","menu_name":"accountrisk.show","title":"\u5b50\u8d26\u53f7\u98ce\u63a7\u4fe1\u606f","pid":48,"is_menu":0,"level":1,"sort":1},{"id":20,"icon":"icon","menu_name":"accountrisk.update","title":"\u66f4\u65b0\u5b50\u8d26\u53f7\u5206\u63a7\u4fe1\u606f","pid":48,"is_menu":0,"level":1,"sort":1}],"first_page_url":"https:\/\/api.emide.cn\/api\/permission?page=1","from":1,"last_page":7,"last_page_url":"https:\/\/api.emide.cn\/api\/permission?page=7","next_page_url":"https:\/\/api.emide.cn\/api\/permission?page=2","path":"https:\/\/api.emide.cn\/api\/permission","per_page":20,"prev_page_url":null,"to":20,"total":140},"code":200,"message":"\u6210\u529f"},
    permission_select:{"data":[{"id":0,"title":"\u9876\u7ea7\u83dc\u5355","pid":0},{"id":1,"title":"\u9996\u9875","pid":0},{"id":2,"title":"\u7cfb\u7edf\u8bbe\u7f6e","pid":0},{"id":3,"title":"\u7ba1\u7406\u5458\u7ba1\u7406","pid":0},{"id":4,"title":"\u5546\u6237\u7ba1\u7406","pid":0},{"id":5,"title":"\u901a\u9053\u7ba1\u7406","pid":0},{"id":6,"title":"\u8ba2\u5355\u7ba1\u7406","pid":0},{"id":7,"title":"\u6570\u636e\u62a5\u8868","pid":0},{"id":8,"title":"\u6536\u6b3e\u7801\u7ba1\u7406","pid":0},{"id":9,"title":"\u8d22\u52a1\u7ba1\u7406","pid":0},{"id":10,"title":"\u65b0\u589e\u5b50\u8d26\u53f7","pid":0},{"id":11,"title":"\u5b50\u8d26\u53f7\u5217\u8868","pid":48},{"id":12,"title":"\u8d44\u91d1\u53d8\u52a8","pid":9},{"id":13,"title":"\u4ea7\u54c1\u72b6\u6001","pid":108},{"id":14,"title":"\u5b50\u8d26\u53f7\u5c55\u793a","pid":48},{"id":15,"title":"\u5b50\u8d26\u53f7\u66f4\u65b0","pid":48},{"id":16,"title":"\u5b50\u8d26\u53f7\u5220\u9664","pid":48},{"id":17,"title":"\u5b50\u8d26\u53f7\u8d39\u7387\u4fe1\u606f","pid":48},{"id":18,"title":"\u66f4\u65b0\u5b50\u8d26\u53f7\u8d39\u7387","pid":48},{"id":19,"title":"\u5b50\u8d26\u53f7\u98ce\u63a7\u4fe1\u606f","pid":48},{"id":20,"title":"\u66f4\u65b0\u5b50\u8d26\u53f7\u5206\u63a7\u4fe1\u606f","pid":48},{"id":21,"title":"\u65b0\u589e\u7ba1\u7406\u5458","pid":3},{"id":22,"title":"\u7ba1\u7406\u5458\u5217\u8868","pid":3},{"id":23,"title":"\u540e\u53f0\u767b\u5f55\u65e5\u5fd7","pid":3},{"id":24,"title":"\u4fee\u6539\u5bc6\u7801","pid":2},{"id":25,"title":"\u7ba1\u7406\u5458\u4e0b\u62c9\u83dc\u5355","pid":22},{"id":26,"title":"\u5207\u6362\u7ba1\u7406\u5458\u72b6\u6001","pid":22},{"id":27,"title":"\u7ba1\u7406\u5458\u4fe1\u606f","pid":22},{"id":28,"title":"\u5220\u9664\u7ba1\u7406\u5458","pid":22},{"id":29,"title":"\u66f4\u65b0\u7ba1\u7406\u5458","pid":22},{"id":30,"title":"\u65b0\u589eApp\u7ba1\u7406","pid":31},{"id":31,"title":"App\u7ba1\u7406","pid":5},{"id":32,"title":"App\u767b\u5f55\u65e5\u5fd7","pid":31},{"id":33,"title":"\u65b0\u589eApp\u767b\u5f55\u65e5\u5fd7","pid":31},{"id":34,"title":"\u5c55\u793aApp\u767b\u5f55\u65e5\u5fd7","pid":31},{"id":35,"title":"\u66f4\u65b0App\u767b\u5f55\u65e5\u5fd7","pid":31},{"id":36,"title":"\u5220\u9664App\u767b\u5f55\u65e5\u5fd7","pid":31},{"id":37,"title":"\u91cd\u7f6e\u5bc6\u7801","pid":31},{"id":38,"title":"App\u4e0b\u62c9\u83dc\u5355","pid":31},{"id":39,"title":"\u5220\u9664App","pid":31},{"id":40,"title":"\u4fee\u6539App\u4fe1\u606f","pid":31},{"id":41,"title":"App\u4fe1\u606f\u5c55\u793a","pid":31},{"id":42,"title":"\u4fee\u6539\u57fa\u672c\u8bbe\u7f6e","pid":2},{"id":43,"title":"\u57fa\u672c\u8bbe\u7f6e","pid":2},{"id":44,"title":"\u4fee\u6539\u63d0\u73b0\u8bbe\u7f6e","pid":2},{"id":45,"title":"\u63d0\u73b0\u8bbe\u7f6e","pid":2},{"id":46,"title":"\u8d44\u91d1\u53d8\u52a8\u7c7b\u578b\u5217\u8868","pid":7},{"id":47,"title":"\u8d44\u91d1\u53d8\u52a8\u7c7b\u578b\u4e0b\u62c9\u83dc\u5355","pid":46},{"id":48,"title":"\u901a\u9053\u5217\u8868","pid":5},{"id":49,"title":"\u65b0\u589e\u901a\u9053","pid":48},{"id":50,"title":"\u901a\u9053\u4e0b\u62c9","pid":48},{"id":51,"title":"\u901a\u9053\u72b6\u6001","pid":48},{"id":52,"title":"\u901a\u9053\u7c7b\u578b","pid":48},{"id":53,"title":"\u5220\u9664\u901a\u9053","pid":48},{"id":54,"title":"\u66f4\u65b0\u901a\u9053","pid":48},{"id":55,"title":"\u901a\u9053\u5c55\u793a","pid":48},{"id":56,"title":"\u901a\u9053\u8d39\u7387\u5c55\u793a","pid":48},{"id":57,"title":"\u66f4\u65b0\u901a\u9053\u8d39\u7387","pid":48},{"id":58,"title":"\u66f4\u65b0\u901a\u9053\u98ce\u9669","pid":48},{"id":59,"title":"\u901a\u9053\u98ce\u9669\u663e\u793a","pid":48},{"id":60,"title":"\u90ae\u4ef6\u8bbe\u7f6e","pid":2},{"id":61,"title":"\u4fee\u6539\u90ae\u4ef6\u8bbe\u7f6e","pid":2},{"id":62,"title":"\u5546\u6237\u8d26\u6237","pid":7},{"id":63,"title":"\u7ba1\u7406\u9996\u9875","pid":1},{"id":64,"title":"\u7ba1\u7406\u65e5\u7edf\u8ba1","pid":1},{"id":65,"title":"\u7ba1\u7406\u6708\u7edf\u8ba1","pid":1},{"id":66,"title":"\u7ba1\u7406\u5468\u7edf\u8ba1","pid":1},{"id":67,"title":"\u5df2\u8ba4\u8bc1\u5546\u6237","pid":4},{"id":68,"title":"\u65b0\u589e\u5546\u6237","pid":4},{"id":69,"title":"\u5546\u6237\u65e5\u5fd7","pid":4},{"id":70,"title":"\u66f4\u65b0\u5546\u6237\u8d39\u7387","pid":67},{"id":71,"title":"\u5546\u6237\u8d39\u7387\u5c55\u793a","pid":67},{"id":72,"title":"\u66f4\u65b0\u5546\u6237\u98ce\u63a7","pid":67},{"id":73,"title":"\u5546\u6237\u98ce\u63a7\u8bbe\u7f6e","pid":67},{"id":74,"title":"\u66f4\u65b0\u5546\u6237\u63d0\u73b0\u89c4\u5219","pid":75},{"id":75,"title":"\u5546\u6237\u63d0\u73b0\u89c4\u5219","pid":4},{"id":76,"title":"\u5546\u6237\u8d44\u6599","pid":67},{"id":77,"title":"\u8d44\u91d1\u53d8\u52a8-\u52a0\u6b3e\u6263\u6b3e","pid":4},{"id":78,"title":"\u5546\u6237\u4e0b\u62c9\u5217\u8868","pid":67},{"id":79,"title":"\u5207\u6362\u5546\u6237\u72b6\u6001","pid":67},{"id":80,"title":"\u8ba4\u8bc1\u5931\u8d25\u5546\u6237","pid":4},{"id":81,"title":"\u7b49\u5f85\u8ba4\u8bc1\u5546\u6237","pid":4},{"id":82,"title":"\u66f4\u65b0\u5546\u6237\u4fe1\u606f","pid":67},{"id":83,"title":"\u5220\u9664\u5546\u6237","pid":67},{"id":84,"title":"\u5546\u6237\u4fe1\u606f\u5c55\u793a","pid":0},{"id":85,"title":"\u51bb\u7ed3\u8bb0\u5f55","pid":6},{"id":86,"title":"\u5168\u90e8\u8ba2\u5355","pid":6},{"id":87,"title":"\u5f02\u5e38\u8ba2\u5355","pid":6},{"id":88,"title":"\u8ba2\u5355\u51bb\u7ed3","pid":89},{"id":89,"title":"\u51bb\u7ed3\u8ba2\u5355","pid":6},{"id":90,"title":"\u8bbe\u7f6e\u8ba2\u5355\u5df2\u652f\u4ed8","pid":91},{"id":91,"title":"\u5f85\u652f\u4ed8\u8ba2\u5355","pid":6},{"id":92,"title":"\u6210\u529f\u8ba2\u5355","pid":6},{"id":93,"title":"\u8ba2\u5355\u4fe1\u606f\u5c55\u793a","pid":6},{"id":94,"title":"\u65b0\u589e\u652f\u4ed8\u5206\u7c7b","pid":128},{"id":96,"title":"\u66f4\u65b0\u652f\u4ed8\u5206\u7c7b","pid":128},{"id":97,"title":"\u5220\u9664\u652f\u4ed8\u5206\u7c7b","pid":128},{"id":98,"title":"\u65b0\u589e\u6743\u9650","pid":99},{"id":99,"title":"\u6743\u9650\u5217\u8868","pid":3},{"id":100,"title":"\u6743\u9650\u6811\u5f62\u83dc\u5355","pid":99},{"id":101,"title":"\u6743\u9650\u4e0b\u62c9\u83dc\u5355","pid":99},{"id":102,"title":"\u6743\u9650\u6811\u5f62\u83dc\u5355","pid":99},{"id":103,"title":"\u6743\u9650\u4fe1\u606f\u5c55\u793a","pid":99},{"id":104,"title":"\u66f4\u65b0\u6743\u9650\u4fe1\u606f","pid":99},{"id":105,"title":"\u5220\u9664\u6743\u9650\u4fe1\u606f","pid":99},{"id":106,"title":"\u65b0\u589e\u7ed1\u5b9a\u624b\u673a","pid":0},{"id":107,"title":"\u7ed1\u5b9a\u624b\u673a\u5c55\u793a","pid":0},{"id":108,"title":"\u4ea7\u54c1\u5217\u8868","pid":5},{"id":109,"title":"\u65b0\u589e\u4ea7\u54c1","pid":108},{"id":110,"title":"\u4ea7\u54c1\u5c55\u793a","pid":108},{"id":111,"title":"\u5207\u6362\u4ea7\u54c1\u72b6\u6001","pid":108},{"id":112,"title":"\u4ea7\u54c1\u4fe1\u606f","pid":108},{"id":113,"title":"\u66f4\u65b0\u4ea7\u54c1","pid":108},{"id":114,"title":"\u5220\u9664\u4ea7\u54c1","pid":108},{"id":115,"title":"\u4e8c\u7ef4\u7801\u5934\u50cf","pid":0},{"id":116,"title":"\u65b0\u589e\u89d2\u8272","pid":117},{"id":117,"title":"\u89d2\u8272\u5217\u8868","pid":3},{"id":118,"title":"\u6307\u6d3e\u6743\u9650\u7ed9\u89d2\u8272","pid":117},{"id":119,"title":"\u89d2\u8272\u4e0b\u62c9\u5217\u8868","pid":117},{"id":120,"title":"\u5207\u6362\u89d2\u8272\u72b6\u6001","pid":117},{"id":121,"title":"\u5220\u9664\u89d2\u8272","pid":117},{"id":122,"title":"\u89d2\u8272\u8be6\u60c5","pid":117},{"id":123,"title":"\u66f4\u65b0\u89d2\u8272\u8be6\u60c5","pid":117},{"id":124,"title":"\u77ed\u4fe1\u8bbe\u7f6e","pid":2},{"id":125,"title":"\u66f4\u65b0\u77ed\u4fe1\u8bbe\u7f6e","pid":2},{"id":126,"title":"\u5546\u6237\u7edf\u8ba1\u4fe1\u606f","pid":7},{"id":127,"title":"\u8ba2\u5355\u7edf\u8ba1\u4fe1\u606f","pid":7},{"id":128,"title":"\u652f\u4ed8\u5206\u7c7b","pid":9},{"id":129,"title":"\u9000\u51fa\u767b\u5f55","pid":3},{"id":130,"title":"\u4e2a\u4eba\u4fe1\u606f","pid":3},{"id":131,"title":"\u5237\u65b0Token","pid":3},{"id":132,"title":"\u66f4\u65b0\u98ce\u63a7\u8bbe\u7f6e","pid":133},{"id":133,"title":"\u98ce\u63a7\u8bbe\u7f6e","pid":2},{"id":134,"title":"\u4e0a\u4f20\u56fe\u50cf","pid":0},{"id":135,"title":"\u7cfb\u7edf\u6536\u6b3e\u7801","pid":8},{"id":136,"title":"\u5546\u6237\u6536\u6b3e\u7801","pid":8},{"id":137,"title":"\u63d0\u73b0\u7533\u8bf7","pid":9},{"id":138,"title":"\u4ea4\u6613\u7edf\u8ba1","pid":7},{"id":139,"title":"\u5546\u6237\u4ea4\u6613\u7edf\u8ba1","pid":7},{"id":140,"title":"\u5546\u6237\u62a5\u8868","pid":7},{"id":141,"title":"\u5e73\u53f0\u62a5\u8868","pid":7}],"code":200,"message":"\u6210\u529f"},
    admin_log:{"data":{"current_page":1,"data":[{"id":8,"type":1,"admin_id":1,"comment":"\u5546\u6237\u767b\u5f55","created_at":"1565694002","admin":{"id":1,"name":"mark11"}},{"id":9,"type":1,"admin_id":2,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565772965","admin":{"id":2,"name":"lily"}},{"id":10,"type":1,"admin_id":2,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565776689","admin":{"id":2,"name":"lily"}},{"id":11,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565778434","admin":{"id":1,"name":"mark11"}},{"id":12,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565778729","admin":{"id":1,"name":"mark11"}},{"id":13,"type":1,"admin_id":2,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565780315","admin":{"id":2,"name":"lily"}},{"id":14,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565831214","admin":{"id":1,"name":"mark11"}},{"id":15,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565832823","admin":{"id":1,"name":"mark11"}},{"id":16,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565832826","admin":{"id":1,"name":"mark11"}},{"id":17,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834226","admin":{"id":1,"name":"mark11"}},{"id":18,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834787","admin":{"id":1,"name":"mark11"}},{"id":19,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834802","admin":{"id":1,"name":"mark11"}},{"id":20,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834817","admin":{"id":1,"name":"mark11"}},{"id":21,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834852","admin":{"id":1,"name":"mark11"}},{"id":22,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834884","admin":{"id":1,"name":"mark11"}},{"id":23,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834971","admin":{"id":1,"name":"mark11"}},{"id":24,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565834974","admin":{"id":1,"name":"mark11"}},{"id":25,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565835046","admin":{"id":1,"name":"mark11"}},{"id":26,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565835064","admin":{"id":1,"name":"mark11"}},{"id":27,"type":1,"admin_id":1,"comment":"\u7ba1\u7406\u5458\u767b\u5f55","created_at":"1565835079","admin":{"id":1,"name":"mark11"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/admin-log?page=1","from":1,"last_page":37,"last_page_url":"https:\/\/api.emide.cn\/api\/admin-log?page=37","next_page_url":"https:\/\/api.emide.cn\/api\/admin-log?page=2","path":"https:\/\/api.emide.cn\/api\/admin-log","per_page":20,"prev_page_url":null,"to":20,"total":723},"code":200,"message":"\u6210\u529f"},
    admin_log_select:{"data":[{"id":34,"name":"1111111"},{"id":35,"name":"354345"},{"id":25,"name":"4343111"},{"id":28,"name":"4343111xxx"},{"id":3,"name":"fdsf"},{"id":2,"name":"lily"},{"id":26,"name":"lily111"},{"id":1,"name":"mark11"},{"id":10,"name":"mmmd"},{"id":29,"name":"one22"},{"id":30,"name":"one224"},{"id":31,"name":"one22t"},{"id":24,"name":"test24311"},{"id":32,"name":"\u67ef\u743c\u5f663"},{"id":33,"name":"\u67ef\u743c\u5f66312432"}],"code":200,"message":"\u6210\u529f"},
  },
  financeM:{
    account_change:{"data":{"current_page":1,"data":[{"id":49,"merchant_id":10009,"original_money":"0.0000","change_money":"15421152.0000","changed_money":"0.0000","charge_time":1568182928,"transaction_id":"0","pay_channel_id":0,"pay_type_id":1,"order_id":"","content":"\u5357\u4eac\u53d1\u5e03\u5c81\u8d76\u7d27\u7684\u65b9\u4fbf\u4f60\u4eec\u4e1c\u65b9\u90e1","merchant":{"id":10009,"username":"\u7a33\u7a33\u7684\u53bb"},"order":null,"type":{"id":1,"name":"\u7f34\u7eb3\u670d\u52a1\u8d39"}},{"id":48,"merchant_id":10001,"original_money":"515.3996","change_money":"11.0002","changed_money":"504.3994","charge_time":1568167077,"transaction_id":"0","pay_channel_id":0,"pay_type_id":6,"order_id":"","content":"\u8bbe\u7f6e\u8ba2\u5355test23\u4e3a\u5df2\u652f\u4ed8","merchant":{"id":10001,"username":"acoll"},"order":null,"type":{"id":6,"name":"\u8bbe\u7f6e\u8ba2\u5355\u4e3a\u5df2\u652f\u4ed8"}},{"id":47,"merchant_id":10002,"original_money":"22.1000","change_money":"11.0000","changed_money":"11.1000","charge_time":1568166215,"transaction_id":"0","pay_channel_id":0,"pay_type_id":7,"order_id":"","content":"\u51bb\u7ed3\u8ba2\u5355","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"}},{"id":46,"merchant_id":10001,"original_money":"526.3998","change_money":"11.0002","changed_money":"515.3996","charge_time":1568110606,"transaction_id":"0","pay_channel_id":0,"pay_type_id":7,"order_id":"","content":"\u51bb\u7ed3\u8ba2\u5355","merchant":{"id":10001,"username":"acoll"},"order":null,"type":{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"}},{"id":45,"merchant_id":10002,"original_money":"33.1000","change_money":"11.0000","changed_money":"22.1000","charge_time":1568110532,"transaction_id":"0","pay_channel_id":0,"pay_type_id":6,"order_id":"","content":"\u8bbe\u7f6e\u8ba2\u5355test233\u4e3a\u5df2\u652f\u4ed8","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":6,"name":"\u8bbe\u7f6e\u8ba2\u5355\u4e3a\u5df2\u652f\u4ed8"}},{"id":44,"merchant_id":10002,"original_money":"44.1000","change_money":"11.0000","changed_money":"33.1000","charge_time":1568105612,"transaction_id":"0","pay_channel_id":0,"pay_type_id":6,"order_id":"","content":"\u8bbe\u7f6e\u8ba2\u5355testid\u4e3a\u5df2\u652f\u4ed8","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":6,"name":"\u8bbe\u7f6e\u8ba2\u5355\u4e3a\u5df2\u652f\u4ed8"}},{"id":42,"merchant_id":10002,"original_money":"174.1000","change_money":"120.0000","changed_money":"54.1000","charge_time":1568099860,"transaction_id":"0","pay_channel_id":0,"pay_type_id":9,"order_id":"","content":"\u4f59\u989d\u63d0\u73b0","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":9,"name":"\u4f59\u989d\u63d0\u73b0"}},{"id":43,"merchant_id":10002,"original_money":"54.1000","change_money":"10.0000","changed_money":"44.1000","charge_time":1568099860,"transaction_id":"0","pay_channel_id":0,"pay_type_id":5,"order_id":"","content":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":5,"name":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39"}},{"id":40,"merchant_id":10002,"original_money":"304.1000","change_money":"120.0000","changed_money":"184.1000","charge_time":1568022751,"transaction_id":"0","pay_channel_id":0,"pay_type_id":9,"order_id":"","content":"\u4f59\u989d\u63d0\u73b0","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":9,"name":"\u4f59\u989d\u63d0\u73b0"}},{"id":41,"merchant_id":10002,"original_money":"184.1000","change_money":"10.0000","changed_money":"174.1000","charge_time":1568022751,"transaction_id":"0","pay_channel_id":0,"pay_type_id":5,"order_id":"","content":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":5,"name":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39"}},{"id":38,"merchant_id":10002,"original_money":"434.1000","change_money":"120.0000","changed_money":"314.1000","charge_time":1568022444,"transaction_id":"0","pay_channel_id":0,"pay_type_id":9,"order_id":"","content":"\u4f59\u989d\u63d0\u73b0","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":9,"name":"\u4f59\u989d\u63d0\u73b0"}},{"id":39,"merchant_id":10002,"original_money":"314.1000","change_money":"10.0000","changed_money":"304.1000","charge_time":1568022444,"transaction_id":"0","pay_channel_id":0,"pay_type_id":5,"order_id":"","content":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":5,"name":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39"}},{"id":37,"merchant_id":10002,"original_money":"544.1000","change_money":"110.0000","changed_money":"434.1000","charge_time":1568022192,"transaction_id":"0","pay_channel_id":0,"pay_type_id":9,"order_id":"","content":"\u4f59\u989d\u63d0\u73b0","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":9,"name":"\u4f59\u989d\u63d0\u73b0"}},{"id":36,"merchant_id":10007,"original_money":"0.0000","change_money":"100.0000","changed_money":"0.0000","charge_time":1567998007,"transaction_id":"0","pay_channel_id":0,"pay_type_id":1,"order_id":"","content":"sd","merchant":{"id":10007,"username":"\u6f14\u793a\u4eba\u5458222"},"order":null,"type":{"id":1,"name":"\u7f34\u7eb3\u670d\u52a1\u8d39"}},{"id":35,"merchant_id":10002,"original_money":"547.4000","change_money":"3.3000","changed_money":"544.1000","charge_time":1567420391,"transaction_id":"0","pay_channel_id":0,"pay_type_id":7,"order_id":"","content":"\u51bb\u7ed3\u8ba2\u5355","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"}},{"id":34,"merchant_id":10001,"original_money":"529.6998","change_money":"3.3000","changed_money":"526.3998","charge_time":1567418892,"transaction_id":"0","pay_channel_id":0,"pay_type_id":7,"order_id":"","content":"\u51bb\u7ed3\u8ba2\u5355","merchant":{"id":10001,"username":"acoll"},"order":null,"type":{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"}},{"id":33,"merchant_id":10001,"original_money":"540.7000","change_money":"11.0002","changed_money":"529.6998","charge_time":1567412471,"transaction_id":"0","pay_channel_id":0,"pay_type_id":6,"order_id":"","content":"\u8bbe\u7f6e\u8ba2\u5355test23\u4e3a\u5df2\u652f\u4ed8","merchant":{"id":10001,"username":"acoll"},"order":null,"type":{"id":6,"name":"\u8bbe\u7f6e\u8ba2\u5355\u4e3a\u5df2\u652f\u4ed8"}},{"id":32,"merchant_id":10001,"original_money":"544.0000","change_money":"3.3000","changed_money":"540.7000","charge_time":1567412461,"transaction_id":"0","pay_channel_id":0,"pay_type_id":7,"order_id":"","content":"\u51bb\u7ed3\u8ba2\u5355","merchant":{"id":10001,"username":"acoll"},"order":null,"type":{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"}},{"id":31,"merchant_id":10002,"original_money":"550.7000","change_money":"3.3000","changed_money":"547.4000","charge_time":1567411920,"transaction_id":"0","pay_channel_id":0,"pay_type_id":7,"order_id":"","content":"\u51bb\u7ed3\u8ba2\u5355","merchant":{"id":10002,"username":"mark"},"order":null,"type":{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"}},{"id":30,"merchant_id":10001,"original_money":"555.0000","change_money":"11.0000","changed_money":"544.0000","charge_time":1567411893,"transaction_id":"0","pay_channel_id":0,"pay_type_id":6,"order_id":"","content":"\u8bbe\u7f6e\u8ba2\u5355test\u4e3a\u5df2\u652f\u4ed8","merchant":{"id":10001,"username":"acoll"},"order":null,"type":{"id":6,"name":"\u8bbe\u7f6e\u8ba2\u5355\u4e3a\u5df2\u652f\u4ed8"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/account-change?page=1","from":1,"last_page":2,"last_page_url":"https:\/\/api.emide.cn\/api\/account-change?page=2","next_page_url":"https:\/\/api.emide.cn\/api\/account-change?page=2","path":"https:\/\/api.emide.cn\/api\/account-change","per_page":20,"prev_page_url":null,"to":20,"total":24},"code":200,"message":"\u6210\u529f"},
    merchant_select:{"data":[{"id":10001,"name":"acoll"},{"id":10002,"name":"mark"},{"id":10003,"name":"lily"},{"id":10004,"name":"\u6f14\u793a\u4eba\u5458"},{"id":10005,"name":"\u6f14\u793a\u4eba\u5458132"},{"id":10006,"name":"lily36"},{"id":10007,"name":"\u6f14\u793a\u4eba\u5458222"},{"id":10008,"name":"card9"},{"id":10009,"name":"\u7a33\u7a33\u7684\u53bb"}],"code":200,"message":"\u6210\u529f"},
    accpunt_change_type_select:{"data":[{"id":1,"name":"\u7f34\u7eb3\u670d\u52a1\u8d39"},{"id":2,"name":"\u8865\u5355\u52a0\u6b3e"},{"id":3,"name":"\u4ea4\u7eb3\u4fdd\u8bc1\u91d1"},{"id":4,"name":"\u9000\u8fd8\u4fdd\u8bc1\u91d1"},{"id":5,"name":"\u63d0\u73b0\u6263\u9664\u624b\u7eed\u8d39"},{"id":6,"name":"\u8bbe\u7f6e\u8ba2\u5355\u4e3a\u5df2\u652f\u4ed8"},{"id":7,"name":"\u51bb\u7ed3\u8ba2\u5355"},{"id":8,"name":"\u89e3\u51bb\u8ba2\u5355"},{"id":9,"name":"\u4f59\u989d\u63d0\u73b0"},{"id":10,"name":"\u51bb\u7ed3\u5546\u6237\u4f59\u989d"},{"id":11,"name":"\u89e3\u51bb\u5546\u6237\u4f59\u989d"}],"code":200,"message":"\u6210\u529f"},
    cash_log:{"data":{"current_page":1,"data":[{"id":9,"merchant_id":10002,"bankcard_id":9,"cash_no":"20190909100020449","status":4,"apply_money":"120.0000","actual_money":"110.0000","fee":"10.0000","admin_id":1,"verify_time":1568101458,"verify_ip":"192.168.2.9","verify_remark":"\u6d4b\u8bd5","transfer_remark":"","add_ip":"127.0.0.1","created_at":"1568022156","admin":{"id":1,"name":"mark11"},"merchant":{"id":10002,"username":"mark"},"card":{"id":9,"merchant_id":10002,"bank_id":1,"sub_branch":"ssdddd","account_name":"xxxxxx","card_number":"s332323","province":null,"city":null,"alias":"","default":0,"updated_at":"1566814150","created_at":"1566812465","bank":{"id":1,"bank_name":"\u5317\u4eac\u94f6\u884c","bank_code":"BOB"}}},{"id":10,"merchant_id":10002,"bankcard_id":9,"cash_no":"20190909100024905","status":4,"apply_money":"120.0000","actual_money":"120.0000","fee":"10.0000","admin_id":1,"verify_time":1568101560,"verify_ip":"192.168.2.9","verify_remark":"\u8f6c\u8d26\u5907\u6ce8","transfer_remark":"","add_ip":"127.0.0.1","created_at":"1568022423","admin":{"id":1,"name":"mark11"},"merchant":{"id":10002,"username":"mark"},"card":{"id":9,"merchant_id":10002,"bank_id":1,"sub_branch":"ssdddd","account_name":"xxxxxx","card_number":"s332323","province":null,"city":null,"alias":"","default":0,"updated_at":"1566814150","created_at":"1566812465","bank":{"id":1,"bank_name":"\u5317\u4eac\u94f6\u884c","bank_code":"BOB"}}},{"id":11,"merchant_id":10002,"bankcard_id":9,"cash_no":"20190909100021001","status":2,"apply_money":"120.0000","actual_money":"120.0000","fee":"10.0000","admin_id":1,"verify_time":1568022751,"verify_ip":"127.0.0.1","verify_remark":"111111","transfer_remark":"","add_ip":"127.0.0.1","created_at":"1568022731","admin":{"id":1,"name":"mark11"},"merchant":{"id":10002,"username":"mark"},"card":{"id":9,"merchant_id":10002,"bank_id":1,"sub_branch":"ssdddd","account_name":"xxxxxx","card_number":"s332323","province":null,"city":null,"alias":"","default":0,"updated_at":"1566814150","created_at":"1566812465","bank":{"id":1,"bank_name":"\u5317\u4eac\u94f6\u884c","bank_code":"BOB"}}},{"id":12,"merchant_id":10002,"bankcard_id":9,"cash_no":"20190910100022400","status":2,"apply_money":"120.0000","actual_money":"120.0000","fee":"10.0000","admin_id":0,"verify_time":1568099860,"verify_ip":"192.168.2.9","verify_remark":"234","transfer_remark":"","add_ip":"127.0.0.1","created_at":"1568098403","admin":null,"merchant":{"id":10002,"username":"mark"},"card":{"id":9,"merchant_id":10002,"bank_id":1,"sub_branch":"ssdddd","account_name":"xxxxxx","card_number":"s332323","province":null,"city":null,"alias":"","default":0,"updated_at":"1566814150","created_at":"1566812465","bank":{"id":1,"bank_name":"\u5317\u4eac\u94f6\u884c","bank_code":"BOB"}}}],"first_page_url":"https:\/\/api.emide.cn\/api\/cash-log?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/cash-log?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/cash-log","per_page":20,"prev_page_url":null,"to":4,"total":4},"code":200,"message":"\u6210\u529f"},
  },
  finance:{
    trade:{"data":{"merchants":{"current_page":1,"data":[{"id":10001,"username":"acoll","realname":"\u5e73\u7490","pay_amount_total":"24.0320","pay_poundage_total":"16.0000","pay_actual_amount_total":"22.0002","balance":"504.3994","balance_disabled":"17.6002","all_order_count":2,"paid_order_count":2,"not_paid_order_count":0,"all_order_amount":"24.0320","paid_order_amount":"24.0320","all_order_poundage":"16.0000","user_income":"22.0002","platform_income":"15.9997","order":[{"id":1,"merchant_id":"10001","pay_amount":"12.0020","pay_poundage":"8.0000","pay_actual_amount":"11.0000","cost":"0.0003","pay_status":1},{"id":4,"merchant_id":"10001","pay_amount":"12.0300","pay_poundage":"8.0000","pay_actual_amount":"11.0002","cost":"0.0000","pay_status":1}],"fund":{"id":21,"merchant_id":10001,"balance":"504.3994","balance_disabled":"17.6002"}},{"id":10002,"username":"mark","realname":"zxh","pay_amount_total":"35.3620","pay_poundage_total":"24.0000","pay_actual_amount_total":"33.0001","balance":"11.1000","balance_disabled":"20.9000","all_order_count":3,"paid_order_count":3,"not_paid_order_count":0,"all_order_amount":"35.3620","paid_order_amount":"35.3620","all_order_poundage":"24.0000","user_income":"33.0001","platform_income":"23.9995","order":[{"id":3,"merchant_id":"10002","pay_amount":"12.0320","pay_poundage":"8.0000","pay_actual_amount":"11.0000","cost":"0.0000","pay_status":1},{"id":6,"merchant_id":"10002","pay_amount":"12.0000","pay_poundage":"8.0000","pay_actual_amount":"11.0001","cost":"0.0005","pay_status":1},{"id":7,"merchant_id":"10002","pay_amount":"11.3300","pay_poundage":"8.0000","pay_actual_amount":"11.0000","cost":"0.0000","pay_status":1}],"fund":{"id":24,"merchant_id":10002,"balance":"11.1000","balance_disabled":"20.9000"}},{"id":10003,"username":"lily","realname":"\u5927\u6cd5","pay_amount_total":0,"pay_poundage_total":0,"pay_actual_amount_total":0,"balance":"555.0000","balance_disabled":"0.0000","all_order_count":0,"paid_order_count":0,"not_paid_order_count":0,"all_order_amount":0,"paid_order_amount":0,"all_order_poundage":0,"user_income":0,"platform_income":0,"order":[],"fund":{"id":28,"merchant_id":10003,"balance":"555.0000","balance_disabled":"0.0000"}},{"id":10006,"username":"lily36","realname":"\u5927\u6cd5","pay_amount_total":0,"pay_poundage_total":0,"pay_actual_amount_total":0,"balance":"0.0000","balance_disabled":"0.0000","all_order_count":0,"paid_order_count":0,"not_paid_order_count":0,"all_order_amount":0,"paid_order_amount":0,"all_order_poundage":0,"user_income":0,"platform_income":0,"order":[],"fund":{"id":32,"merchant_id":10006,"balance":"0.0000","balance_disabled":"0.0000"}},{"id":10007,"username":"\u6f14\u793a\u4eba\u5458222","realname":"\u6c89\u6c89c","pay_amount_total":0,"pay_poundage_total":0,"pay_actual_amount_total":0,"balance":"0.0000","balance_disabled":"0.0000","all_order_count":0,"paid_order_count":0,"not_paid_order_count":0,"all_order_amount":0,"paid_order_amount":0,"all_order_poundage":0,"user_income":0,"platform_income":0,"order":[],"fund":{"id":33,"merchant_id":10007,"balance":"0.0000","balance_disabled":"0.0000"}},{"id":10009,"username":"\u7a33\u7a33\u7684\u53bb","realname":"\u53bb\u95ee\u95ee\u591a","pay_amount_total":0,"pay_poundage_total":0,"pay_actual_amount_total":0,"balance":"0.0000","balance_disabled":"0.0000","all_order_count":0,"paid_order_count":0,"not_paid_order_count":0,"all_order_amount":0,"paid_order_amount":0,"all_order_poundage":0,"user_income":0,"platform_income":0,"order":[],"fund":{"id":35,"merchant_id":10009,"balance":"0.0000","balance_disabled":"0.0000"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/finance\/user-trade?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/finance\/user-trade?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/finance\/user-trade","per_page":20,"prev_page_url":null,"to":6,"total":6},"statistics":{"member_count":6,"all_order_count":5,"paid_order_count":5,"not_paid_order_count":0,"all_order_amount":"59.3940","paid_order_amount":"59.3940","all_order_poundage":"40.0000","user_income":"55.0003","platform_income":"39.9992","balance":"1070.4994","balance_disabled":"38.5002","pay_amount_total":"59.3940"}},"code":200,"message":"\u6210\u529f"},
    // user_trade:{"data":{"time":["2019-08-16","2019-08-17","2019-08-18","2019-08-19","2019-08-20","2019-08-21","2019-08-22","2019-08-23","2019-08-24","2019-08-25","2019-08-26","2019-08-27","2019-08-28","2019-08-29","2019-08-30","2019-08-31","2019-09-01","2019-09-02","2019-09-03","2019-09-04","2019-09-05","2019-09-06","2019-09-07","2019-09-08","2019-09-09","2019-09-10","2019-09-11","2019-09-12","2019-09-13","2019-09-14","2019-09-15","2019-09-16"],"result":[{"name":"\u4ea4\u6613\u91d1\u989d","type":"line","stack":"\u603b\u91cf","data":[0,0,0,0,0,0,0,0,0,0,"12.0000",0,0,0,0,0,0,"12.0020",0,0,0,0,0,0,0,"23.3620","12.0300",0,0,0,0,0]},{"name":"\u6536\u5165\u91d1\u989d","type":"line","stack":"\u603b\u91cf","data":[0,0,0,0,0,0,0,0,0,0,"11.0001",0,0,0,0,0,0,"11.0000",0,0,0,0,0,0,0,"22.0000","11.0002",0,0,0,0,0]},{"name":"\u652f\u51fa\u91d1\u989d","type":"line","stack":"\u603b\u91cf","data":[0,0,0,0,0,0,0,0,0,0,"8.0000",0,0,0,0,0,0,"8.0000",0,0,0,0,0,0,0,"16.0000","8.0000",0,0,0,0,0]}],"order":{"current_page":1,"data":[{"id":7,"merchant_id":"10002","pay_type_id":0,"pay_channel_id":"10000","pay_amount":"11.3300","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_success_date":1568105612,"pay_status":1,"cost":"0.0000","created_at":"1566870323","merchant":{"id":10002,"username":"mark","realname":"zxh"},"channel":null,"type":null},{"id":6,"merchant_id":"10002","pay_type_id":3,"pay_channel_id":"10000","pay_amount":"12.0000","pay_poundage":"8.0000","pay_actual_amount":"11.0001","pay_success_date":1566782661,"pay_status":1,"cost":"0.0005","created_at":"1566782661","merchant":{"id":10002,"username":"mark","realname":"zxh"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":1,"merchant_id":"10001","pay_type_id":3,"pay_channel_id":"10000","pay_amount":"12.0020","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_success_date":1567411893,"pay_status":1,"cost":"0.0003","created_at":"1566525129","merchant":{"id":10001,"username":"acoll","realname":"\u5e73\u7490"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":4,"merchant_id":"10001","pay_type_id":2,"pay_channel_id":"10000","pay_amount":"12.0300","pay_poundage":"8.0000","pay_actual_amount":"11.0002","pay_success_date":1568167077,"pay_status":1,"cost":"0.0000","created_at":"1566525000","merchant":{"id":10001,"username":"acoll","realname":"\u5e73\u7490"},"channel":null,"type":{"id":2,"name":"\u5fae\u4fe1H5"}},{"id":3,"merchant_id":"10002","pay_type_id":5,"pay_channel_id":"10000","pay_amount":"12.0320","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_success_date":1568110532,"pay_status":1,"cost":"0.0000","created_at":"1566383041","merchant":{"id":10002,"username":"mark","realname":"zxh"},"channel":null,"type":{"id":5,"name":"\u652f\u4ed8\u5b9dH5"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/finance-trade?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/finance-trade?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/finance-trade","per_page":20,"prev_page_url":null,"to":5,"total":5}},"code":200,"message":"\u6210\u529f"},
    email:{"data":{"smtp_host":"127.0.0.1","smtp_port":"232311","smtp_user":"admins2","smtp_pass":"adminpasses2","smtp_email":"admins@emid.com2","smtp_name":"\u514d\u7b7e\u7cfb\u7edf2"},"code":200,"message":"\u6210\u529f"},
  },
  order:{
    order:{"data":{"current_page":1,"data":[{"id":7,"merchant_id":"10002","pay_order_id":"testid","out_trade_id":"testid2","pay_amount":"11.3300","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1566870323,"pay_success_date":1568105612,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"test","pay_callback_url":"test2","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":210,"t":1,"last_reissue_time":11,"pay_type_id":0,"is_callback":0,"lock_status":1,"search_status":1,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":null},{"id":6,"merchant_id":"10002","pay_order_id":"test25","out_trade_id":"aaaa","pay_amount":"12.0000","pay_poundage":"8.0000","pay_actual_amount":"11.0001","pay_apply_date":1566782661,"pay_success_date":1566782661,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0005","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":3,"is_callback":1,"lock_status":0,"search_status":2,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":1,"merchant_id":"10001","pay_order_id":"test","out_trade_id":"aaaa","pay_amount":"12.0020","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1568131201,"pay_success_date":1567411893,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":0,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0003","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":3,"is_callback":0,"lock_status":0,"search_status":1,"merchant":{"id":10001,"username":"acoll"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":4,"merchant_id":"10001","pay_order_id":"test23","out_trade_id":"aaaa","pay_amount":"12.0300","pay_poundage":"8.0000","pay_actual_amount":"11.0002","pay_apply_date":1568131201,"pay_success_date":1568167077,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":2,"is_callback":0,"lock_status":1,"search_status":1,"merchant":{"id":10001,"username":"acoll"},"channel":null,"type":{"id":2,"name":"\u5fae\u4fe1H5"}},{"id":3,"merchant_id":"10002","pay_order_id":"test233","out_trade_id":"aaaa2","pay_amount":"12.0320","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1579131201,"pay_success_date":1568110532,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"http:\/\/localhost\/pay\/index.php","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":11,"member_id":null,"key":null,"account":null,"order_type":0,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":210,"t":1,"last_reissue_time":11,"pay_type_id":5,"is_callback":1,"lock_status":0,"search_status":2,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":{"id":5,"name":"\u652f\u4ed8\u5b9dH5"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/order?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/order?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/order","per_page":20,"prev_page_url":null,"to":5,"total":5},"code":200,"message":"\u6210\u529f"},
    paytype_select:{"data":[{"id":1,"name":"\u5fae\u4fe1\u626b\u7801"},{"id":2,"name":"\u5fae\u4fe1H5"},{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"},{"id":4,"name":"\u652f\u4ed8\u5b9d\u626b\u7801"},{"id":5,"name":"\u652f\u4ed8\u5b9dH5"},{"id":6,"name":"\u7f51\u94f6\u76f4\u8fde"},{"id":7,"name":"\u7f51\u94f6\u5feb\u6377"},{"id":8,"name":"\u767e\u5ea6\u94b1\u5305"},{"id":9,"name":"QQ\u94b1\u5305"},{"id":10,"name":"\u4eac\u4e1c\u94b1\u5305"},{"id":11,"name":"\u5fae\u4fe1\u56fa\u7801"},{"id":12,"name":"\u652f\u4ed8\u5b9d\u56fa\u7801"}],"code":200,"message":"\u6210\u529f"},
    channel_select:{"data":[{"id":10000,"title":"\u5fae\u4fe1\u56fa\u7801","status":1},{"id":10002,"title":"\u652f\u4ed8\u5b9d\u56fa\u7801","status":1},{"id":10003,"title":"\u652f\u4ed8\u5b9d\u626b\u7801Demo113","status":1},{"id":10004,"title":"asdasdasda","status":0},{"id":10005,"title":"asdasda","status":0},{"id":10008,"title":"\u5fae\u4fe1\u56fa\u7801ss","status":0}],"code":200,"message":"\u6210\u529f"},
    fail:{"data":{"current_page":1,"data":[{"id":7,"merchant_id":"10002","pay_order_id":"testid","out_trade_id":"testid2","pay_amount":"11.3300","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1566870323,"pay_success_date":1568105612,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"test","pay_callback_url":"test2","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":210,"t":1,"last_reissue_time":11,"pay_type_id":0,"is_callback":0,"lock_status":1,"search_status":1,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":null},{"id":1,"merchant_id":"10001","pay_order_id":"test","out_trade_id":"aaaa","pay_amount":"12.0020","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1568131201,"pay_success_date":1567411893,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":0,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0003","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":3,"is_callback":0,"lock_status":0,"search_status":1,"merchant":{"id":10001,"username":"acoll"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":4,"merchant_id":"10001","pay_order_id":"test23","out_trade_id":"aaaa","pay_amount":"12.0300","pay_poundage":"8.0000","pay_actual_amount":"11.0002","pay_apply_date":1568131201,"pay_success_date":1568167077,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":2,"is_callback":0,"lock_status":1,"search_status":1,"merchant":{"id":10001,"username":"acoll"},"channel":null,"type":{"id":2,"name":"\u5fae\u4fe1H5"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/order\/fail?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/order\/fail?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/order\/fail","per_page":20,"prev_page_url":null,"to":3,"total":3},"code":200,"message":"\u6210\u529f"},
    success:{"data":{"current_page":1,"data":[{"id":7,"merchant_id":"10002","pay_order_id":"testid","out_trade_id":"testid2","pay_amount":"11.3300","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1566870323,"pay_success_date":1568105612,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"test","pay_callback_url":"test2","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":210,"t":1,"last_reissue_time":11,"pay_type_id":0,"is_callback":0,"lock_status":1,"search_status":1,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":null},{"id":6,"merchant_id":"10002","pay_order_id":"test25","out_trade_id":"aaaa","pay_amount":"12.0000","pay_poundage":"8.0000","pay_actual_amount":"11.0001","pay_apply_date":1566782661,"pay_success_date":1566782661,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0005","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":3,"is_callback":1,"lock_status":0,"search_status":2,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":1,"merchant_id":"10001","pay_order_id":"test","out_trade_id":"aaaa","pay_amount":"12.0020","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1568131201,"pay_success_date":1567411893,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":0,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0003","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":3,"is_callback":0,"lock_status":0,"search_status":1,"merchant":{"id":10001,"username":"acoll"},"channel":null,"type":{"id":3,"name":"\u5fae\u4fe1\u516c\u4f17\u53f7"}},{"id":4,"merchant_id":"10001","pay_order_id":"test23","out_trade_id":"aaaa","pay_amount":"12.0300","pay_poundage":"8.0000","pay_actual_amount":"11.0002","pay_apply_date":1568131201,"pay_success_date":1568167077,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":0,"member_id":null,"key":null,"account":null,"order_type":1,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":2,"t":1,"last_reissue_time":11,"pay_type_id":2,"is_callback":0,"lock_status":1,"search_status":1,"merchant":{"id":10001,"username":"acoll"},"channel":null,"type":{"id":2,"name":"\u5fae\u4fe1H5"}},{"id":3,"merchant_id":"10002","pay_order_id":"test233","out_trade_id":"aaaa2","pay_amount":"12.0320","pay_poundage":"8.0000","pay_actual_amount":"11.0000","pay_apply_date":1579131201,"pay_success_date":1568110532,"pay_channel_id":"10000","pay_channel_name":null,"pay_channel_code":null,"pay_notify_url":"http:\/\/localhost\/pay\/index.php","pay_callback_url":"","pay_status":1,"pay_product":null,"pay_gateway":null,"num":11,"member_id":null,"key":null,"account":null,"order_type":0,"pay_channel_reissue":null,"pay_channel_pay_reissue":null,"info":0,"attach":null,"pay_channel_account":null,"cost":"0.0000","cost_rate":"0.0000","account_id":0,"channel_id":210,"t":1,"last_reissue_time":11,"pay_type_id":5,"is_callback":1,"lock_status":0,"search_status":2,"merchant":{"id":10002,"username":"mark"},"channel":null,"type":{"id":5,"name":"\u652f\u4ed8\u5b9dH5"}}],"first_page_url":"https:\/\/api.emide.cn\/api\/order\/success?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/order\/success?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/order\/success","per_page":20,"prev_page_url":null,"to":5,"total":5},"code":200,"message":"\u6210\u529f"},
    pending:{"data":{"current_page":1,"data":[],"first_page_url":"https:\/\/api.emide.cn\/api\/order\/pending?page=1","from":null,"last_page":1,"last_page_url":"https:\/\/api.emide.cn\/api\/order\/pending?page=1","next_page_url":null,"path":"https:\/\/api.emide.cn\/api\/order\/pending","per_page":20,"prev_page_url":null,"to":null,"total":0},"code":200,"message":"\u6210\u529f"},
  },
  capitol:{
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 30,
                "merchant_id": 10001,
                "original_money": "555.0000",
                "change_money": "11.0000",
                "changed_money": "544.0000",
                "charge_time": 1567411893,
                "transaction_id": "0",
                "pay_channel_id": 10000,
                "pay_type_id": 6,
                "order_id": "1",
                "content": "设置订单test为已支付",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": {
                    "id": 1,
                    "merchant_id": "10001",
                    "pay_order_id": "2019081810001123659823",
                    "out_trade_id": "aaaa",
                    "channel_id": 2,
                    "channel": null
                },
                "type": {
                    "id": 6,
                    "name": "设置订单为已支付"
                }
            },
            {
                "id": 32,
                "merchant_id": 10001,
                "original_money": "544.0000",
                "change_money": "3.3000",
                "changed_money": "540.7000",
                "charge_time": 1567412461,
                "transaction_id": "0",
                "pay_channel_id": 10000,
                "pay_type_id": 7,
                "order_id": "",
                "content": "冻结订单",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": null,
                "type": {
                    "id": 7,
                    "name": "冻结订单"
                }
            },
            {
                "id": 33,
                "merchant_id": 10001,
                "original_money": "540.7000",
                "change_money": "11.0002",
                "changed_money": "529.6998",
                "charge_time": 1567412471,
                "transaction_id": "0",
                "pay_channel_id": 10002,
                "pay_type_id": 6,
                "order_id": "3",
                "content": "设置订单test23为已支付",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": {
                    "id": 3,
                    "merchant_id": "10002",
                    "pay_order_id": "2019081810001123659824",
                    "out_trade_id": "aaaa2",
                    "channel_id": 210,
                    "channel": null
                },
                "type": {
                    "id": 6,
                    "name": "设置订单为已支付"
                }
            },
            {
                "id": 34,
                "merchant_id": 10001,
                "original_money": "529.6998",
                "change_money": "3.3000",
                "changed_money": "526.3998",
                "charge_time": 1567418892,
                "transaction_id": "0",
                "pay_channel_id": 10002,
                "pay_type_id": 7,
                "order_id": "4",
                "content": "冻结订单",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": {
                    "id": 4,
                    "merchant_id": "10001",
                    "pay_order_id": "2019081810001123659825",
                    "out_trade_id": "aaaa",
                    "channel_id": 2,
                    "channel": null
                },
                "type": {
                    "id": 7,
                    "name": "冻结订单"
                }
            },
            {
                "id": 46,
                "merchant_id": 10001,
                "original_money": "526.3998",
                "change_money": "11.0002",
                "changed_money": "515.3996",
                "charge_time": 1568110606,
                "transaction_id": "0",
                "pay_channel_id": 10002,
                "pay_type_id": 7,
                "order_id": "",
                "content": "冻结订单",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": null,
                "type": {
                    "id": 7,
                    "name": "冻结订单"
                }
            },
            {
                "id": 49,
                "merchant_id": 10001,
                "original_money": "515.3996",
                "change_money": "11.0002",
                "changed_money": "504.3994",
                "charge_time": 1568170787,
                "transaction_id": "0",
                "pay_channel_id": 10002,
                "pay_type_id": 6,
                "order_id": "",
                "content": "设置订单test23为已支付",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": null,
                "type": {
                    "id": 6,
                    "name": "设置订单为已支付"
                }
            },
            {
                "id": 50,
                "merchant_id": 10001,
                "original_money": "504.3994",
                "change_money": "11.0000",
                "changed_money": "493.3994",
                "charge_time": 1568170860,
                "transaction_id": "0",
                "pay_channel_id": 10002,
                "pay_type_id": 7,
                "order_id": "",
                "content": "冻结订单",
                "merchant": {
                    "id": 10001,
                    "username": "acoll"
                },
                "order": null,
                "type": {
                    "id": 7,
                    "name": "冻结订单"
                }
            }
        ],
        "first_page_url": "http://test.laravel.com/merchant/account-change?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://test.laravel.com/merchant/account-change?page=1",
        "next_page_url": null,
        "path": "http://test.laravel.com/merchant/account-change",
        "per_page": 20,
        "prev_page_url": null,
        "to": 7,
        "total": 7
    },
    "code": 200,
    "message": "成功"
}
};
