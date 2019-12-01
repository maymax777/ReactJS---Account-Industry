

export const navigationConfig = () => {
  // return new Promise((resolve, reject) => {
  //     api.get('http://localhost:8000/core/primarymenu/0', {}).then(res => {
  //         let menu =[
  //             [
  //                  {
  //                 id      : 'applications',
  //                 title   : '',
  //                 type    : 'group',
  //                 icon    : 'apps',
  //                 children: [
  //                                 {
  //                                     id   : 'dashboard-component',
  //                                     title: 'Dashboard',
  //                                     type : 'item',
  //                                     icon : 'dashboard',
  //                                     url  : '/dashboard',
  //                                 },
  //                             ]
  //                     }
  //                 ]
  //             ]


  //         console.log("----------ORIGIN",menu)
  //         resolve(menu);
  //     }, err => {
  //         reject(err)
  //     })
  // })
  // let {data} = await api.get('http://localhost:8000/core/primarymenu/0', {});
  // console.log(JSON.stringify(data.primarymenu))
  // primaryMenu = data.primarymenu
  // console.log("dddddd")
  return [
    [
      {
        id: 'applications',
        title: '',
        type: 'group',
        icon: 'apps',
        children: [
          {
            id: 'dashboard-component',
            title: 'Dashboard',
            type: 'item',
            icon: 'dashboard',
            url: '/dashboard',
          },
          {
            id: 'banking-component',
            title: 'Banking',
            type: 'collapse',
            icon: 'whatshot',
            url: '/users',
            children: [
              {
                id: 'create-bank-page',
                title: 'Create Bank',
                type: 'item',
                icon: 'first_page',
                url: '/banking/bankManager',
                exact: true
              },
              {
                id: 'bank-deposit-page',
                title: 'Bank Deposit',
                type: 'item',
                icon: 'first_page',
                url: '/banking/bankDeposit',

                exact: true
              },
              {
                id: 'bank-withdraw-page',
                title: 'Bank Withdraw',
                type: 'item',
                icon: 'first_page',
                url: '/banking/bankWithdraw',
                exact: true
              },
              {
                id: 'bank-statement-page',
                title: 'Bank Statement',
                type: 'item',
                icon: 'first_page',
                url: '/bankstatement',
                exact: true
              }
            ]
          },
          {
            id: 'accounting-component',
            title: 'Accounting',
            type: 'collapse',
            icon: 'settings',
            url: '/settings',
            children: [
              {
                id: 'journal-voucher-page',
                title: 'Journal Voucher',
                type: 'item',
                icon: 'first_page',
                url: '/journalvoucher',
                exact: true
              },
              {
                id: 'payment-voucher-page',
                title: 'Payment Voucher',
                type: 'item',
                icon: 'category',
                url: '/settings/categories',
                exact: true
              },
              {
                id: 'receipt-voucher',
                title: 'Receipt Voucher',
                type: 'item',
                icon: 'settings_cells',
                url: '/settings/basedata',
                exact: true
              },
              {
                id: 'contra-voucher',
                title: 'Contra Voucher',
                type: 'item',
                icon: 'contact_support',
                url: '/contra',
                exact: true
              },
              {
                id: 'day-book-page',
                title: 'Day Book',
                type: 'item',
                icon: 'question_answer',
                url: '/daybook',
                exact: true
              },
              {
                id: 'cash-book-page',
                title: 'Cash Book',
                type: 'item',
                icon: 'question_answer',
                url: '/cashbook',
                exact: true
              },
            ]
          },
          {
            id: 'sales-page',
            title: 'Sales',
            type: 'collapse',
            icon: 'question_answer',
            url: '/sales',
            children: [
              {
                id: 'create-customer-component',
                title: 'Create Customer',
                type: 'item',
                icon: 'event_note',
                url: '/customer',
              },
              {
                id: 'create-invoice-component',
                title: 'Create Invoice',
                type: 'item',
                icon: 'event_note',
                url: '/createinvoice',
              },
              {
                id: 'sales-report-component',
                title: 'Sales Report',
                type: 'item',
                icon: 'event_note',
                url: '/salesreport',
              }
            ]
          },
          {
            id: 'purchase-page',
            title: 'Purchase',
            type: 'collapse',
            icon: 'question_answer',
            url: '/purchase',
            children: [
              {
                id: 'create-supplier-component',
                title: 'Create Supplier',
                type: 'item',
                icon: 'card_membership',
                url: '/supplier',
              },
              {
                id: 'create-purchase-component',
                title: 'Create Purchase',
                type: 'item',
                icon: 'event_note',
                url: '/purchase',
              },
              {
                id: 'purchase-report-component',
                title: 'Purchase Report',
                type: 'item',
                icon: 'event_note',
                url: '/purchasereport',
              }
            ]
          },
          {
            id: 'hr-payroll-page',
            title: 'Hr Payroll',
            type: 'collapse',
            icon: 'question_answer',
            url: '/hrpayroll',
            children: [
              {
                id: 'employee-info-component',
                title: 'Empolyee Info',
                type: 'item',
                icon: 'credit',
                url: '/credit',
              },
              {
                id: 'salary-setup-component',
                title: 'Salary Setup',
                type: 'item',
                icon: 'event_note',
                url: '/salarysetup',
              },
              {
                id: 'salary-payment-component',
                title: 'Salary Payment',
                type: 'item',
                icon: 'event_note',
                url: '/salarypayment',
              },
              {
                id: 'salary-report-component',
                title: 'Salary Report',
                type: 'item',
                icon: 'event_note',
                url: '/salaryreport',
              },
              {
                id: 'attendance-component',
                title: 'Attendance',
                type: 'item',
                icon: 'event_note',
                url: '/attendance',
              }
            ]
          },

          {
            id: 'budject-page',
            title: 'Budget',
            type: 'collapse',
            icon: 'question_answer',
            url: '/budget',
            children: [
              {
                id: 'tax-setup-component',
                title: 'Create Budget',
                type: 'item',
                icon: 'chat',
                url: '/createbudget',
              },
              {
                id: 'tax-report-component',
                title: 'Manage Budget',
                type: 'item',
                icon: 'event_note',
                url: '/managebudget',
              },
            ]
          },
          {
            id: 'crm-page',
            title: 'Project Management',
            type: 'collapse',
            icon: 'question_answer',
            url: '/project',
            children: [
              {
                id: 'to-do-list-component',
                title: 'To Do List',
                type: 'item',
                icon: 'chat',
                url: '/todolist',
              },
              {
                id: 'new-project-component',
                title: 'New Project',
                type: 'item',
                icon: 'event_note',
                url: '/newproject',
              },

              {
                id: 'manager-project-component',
                title: 'Manage Project',
                type: 'item',
                icon: 'event_note',
                url: '/manageproject',
              },


            ]
          },
          {
            id: 'sms-page',
            title: 'SMS',
            type: 'collapse',
            icon: 'question_answer',
            url: '/sms',
            children: [
              {
                id: 'sms-setting-component',
                title: 'Sms Setting',
                type: 'item',
                icon: 'chat',
                url: '/smssetting',
              },
              {
                id: 'send-sms-component',
                title: 'Send SMS',
                type: 'item',
                icon: 'event_note',
                url: '/sensms',
              },

              {
                id: 'event-chart-component',
                title: 'Event & Chat',
                type: 'item',
                icon: 'event_note',
                url: '/chat',
              },
              {
                id: 'SMS-report-component',
                title: 'SMS Report',
                type: 'item',
                icon: 'event_note',
                url: '/salarypayment',
              },

            ]
          },
          {
            id: 'tax-page',
            title: 'Tax',
            type: 'collapse',
            icon: 'question_answer',
            url: '/tax',
            children: [
              {
                id: 'tax-setup-component',
                title: 'Tax Setup',
                type: 'item',
                icon: 'chat',
                url: '/taxsetup',
              },
              {
                id: 'tax-report-component',
                title: 'Tax Report',
                type: 'item',
                icon: 'event_note',
                url: '/taxreport',
              },
            ]
          },
          {
            id: 'report-page',
            title: 'Report',
            type: 'collapse',
            icon: 'question_answer',
            url: '/report',
            children: [
              {
                id: 'favourite-component',
                title: 'All Report',
                type: 'item',
                icon: 'chat',
                url: '/settings/landing',
              }
            ]
          },
        ]
      }
    ]
  ];
  // return navigationConfigs

}

//  let data =getData()
// console.log("**************MENU*************"+JSON.stringify(primaryMenu))




// export default navigationConfig;
