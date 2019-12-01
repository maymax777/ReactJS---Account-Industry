import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
// import {ExampleConfig} from 'app/main/example/ExampleConfig';
import { UsersAppConfig } from 'app/main/users/UsersAppConfig';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { ForgotConfig } from 'app/main/forgot/ForgotConfig';
import { ResetPassword2PageConfig } from 'app/main/resetpassword/ResetPassword2PageConfig';
import { MailConfirmPageConfig } from 'app/main/mailconfirm/MailConfirmPageConfig';
import { RegisterConfig } from 'app/main/register/RegisterConfig';
import { LogoutConfig } from 'app/main/logout/LogoutConfig';
import { ProfilePageConfig } from 'app/main/profile/ProfilePageConfig'
import { SettingsConfig } from 'app/main/settings/SettingsConfig'
import { EventsConfig } from 'app/main/events/EventsConfig'
import { MembershipConfig } from 'app/main/supplier/MembershipConfig'
import { ChatAppConfig } from 'app/main/chat/ChatAppConfig'
import { DashboardAppConfig } from 'app/main/dashboard/DashboardAppConfig'
import { CreditAppConfig } from 'app/main/credit/CreditAppConfig'
import { CompanyConfig } from 'app/main/company/CompanyConfig'
import { BranchConfig } from 'app/main/branch/BranchConfig'
import { FiscalConfig } from 'app/main/fiscal/FiscalConfig'
import { UserRoleConfig } from 'app/main/userrole/UserRoleConfig'
import { RoleAssignmentConfig } from 'app/main/roleassignment/RoleAssignmentConfig'
import { CustomerConfig } from 'app/main/customer/CustomerConfig'
import { bankwithdrawConfig } from 'app/main/bankwithdraw/bankwithdrawConfig'
import { taxConfig } from 'app/main/tax/taxConfig';
import { InvoiceConfig } from 'app/main/invoice/InvoiceConfig';

import { JournalVoucherConfig } from 'app/main/journalvoucher/JournalVoucherConfig';
import { BankConfig } from '../main/Banking/BankConfig';
import { ProductGroupConfig } from '../main/productGroup/ProductGroupConfig';
import { ProductServiceConfig } from '../main/productservice/ProductServiceConfig';
import { UserLogConfig } from '../main/UserLog/UserLog.config';
const routeConfigs = [
  DashboardAppConfig,
  UsersAppConfig,
  LoginConfig,
  ForgotConfig,
  MailConfirmPageConfig,
  ResetPassword2PageConfig,
  RegisterConfig,
  LogoutConfig,
  ProfilePageConfig,
  SettingsConfig,
  EventsConfig,
  MembershipConfig,
  ChatAppConfig,
  CreditAppConfig,
  CompanyConfig,
  BranchConfig,
  FiscalConfig,
  UserRoleConfig,
  RoleAssignmentConfig,
  ProductServiceConfig,
  CustomerConfig,
  bankwithdrawConfig,
  taxConfig,
  InvoiceConfig,

  JournalVoucherConfig,
  BankConfig,
  ProductGroupConfig,
  UserLogConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/dashboard" />
  }
];

export default routes;
