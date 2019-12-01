const API_URL = "http://localhost:63012";
const Menus = {
  'Company': {
    icon: 'panorama_fish_eye',
    link: '/company'
  },
  'Branch': {
    icon: 'panorama_fish_eye',
    link: '/branch'
  },
  'Fiscal Year': {
    icon: 'panorama_fish_eye',
    link: '/fiscal'
  },
  'User Role': {
    icon: 'panorama_fish_eye',
    link: '/userrole'
  },
  'Users': {
    icon: 'panorama_fish_eye',
    link: '/users'
  },
  'Role Assignment': {
    icon: 'panorama_fish_eye',
    link: '/roleassignment'
  },
  'Product Group': {
    icon: 'panorama_fish_eye',
    link: '/productGroup'
  },
  'Product & Service': {
    icon: 'panorama_fish_eye',
    link: '/Productservice'
  },
  'User Log': {
    icon: 'panorama_fish_eye',
    link: '/userlog'
  },
  'Auto Numbering': {
    icon: 'panorama_fish_eye',
    link: '/autoNumbering'
  },
  'Import Data': {
    icon: 'panorama_fish_eye',
    link: '/importData'
  },
  'Export Data': {
    icon: 'panorama_fish_eye',
    link: '/exprtData'
  },
  'Attachment': {
    icon: 'panorama_fish_eye',
    link: '/attachment'
  },
}
const productTypes = [
  { id: 1, type: 'Inventory' },
  { id: 2, type: 'Non inventory' },
  { id: 3, type: 'Service' },
  { id: 4, type: 'Bundle' },
]
const Apis = {
  UserRegisterApi: `${API_URL}/api/auth/register`,
  GetAllUsersApi: `${API_URL}/api/user/getUsers`,
  CreateUserApi: `${API_URL}/api/user/createUser`,
  UpdateUserApi: `${API_URL}/api/user/updateUser`,
  DeleteUserApi: `${API_URL}/api/user/deleteUser`,
  ResetUserPasswordApi: `${API_URL}/api/user/updatePassword`,
  EmailLoginApi: `${API_URL}/api/auth/authenticate`,
  JwtLoginApi: `${API_URL}/api/auth/jwt`,
  //Branch Apis
  GetAllBranchApi: `${API_URL}/api/branch/getAllBranch`,
  CreateBranchApi: `${API_URL}/api/branch/createBranch`,
  UpdateBranchApi: `${API_URL}/api/branch/updateBranch`,
  RemoveBranchApi: `${API_URL}/api/branch/removeBranch`,

  //Role APis
  GetAllRolesApi: `${API_URL}/api/role/getRoles`,
  CreateRoleApi: `${API_URL}/api/role/createRole`,
  UpdateRoleApi: `${API_URL}/api/role/updateRole`,
  DeleteRoleApi: `${API_URL}/api/role/deleteRole`,

  //Company Apis
  CreateCompanyApi: `${API_URL}/api/company/createCompany`,
  getCompanysApi: `${API_URL}/api/company/getUserCompanys`,
  getAllCompanysApi: `${API_URL}/api/company/getAllCompanys`,
  updateCompanyApi: `${API_URL}/api/company/updateCompany`,
  updateLogoApi: `${API_URL}/api/company/updateLogo`,
  removeCompany: `${API_URL}/api/company/removeCompany`,

  //Fiscal Apis
  CreateFiscalApi: `${API_URL}/api/fiscal/createFiscal`,
  GetFiscalApi: `${API_URL}/api/fiscal/getFiscal`,
  GetAllFiscalsApi: `${API_URL}/api/fiscal/getFiscals`,
  UpdateFiscalApi: `${API_URL}/api/fiscal/updateFiscal`,
  RemoveFiscalApi: `${API_URL}/api/fiscal/removeFiscal`,

  //Auth Role Apis
  CreateAuthRoleApi: `${API_URL}/api/authRole/createAuthRole`,
  GetUserRoleApi: `${API_URL}/api/authRole/getUserRole`,
  GetAuthRoleApi: `${API_URL}/api/authRole/getAuthRole`,
  GetAuthRolesApi: `${API_URL}/api/authRole/getAuthRoles`,
  UpdateAuthRoleApi: `${API_URL}/api/authRole/updateAuthRole`,
  RemoveAuthRoleApi: `${API_URL}/api/authRole/removeAuthRole`,

  //Product Group Apis
  CreateProductGroupApi: `${API_URL}/api/productGroup/createProductGroup`,
  GetProductGroupApi: `${API_URL}/api/productGroup/getProductGroup`,
  GetProductGroupsApi: `${API_URL}/api/productGroup/getProductGroups`,
  UpdateProductGroupApi: `${API_URL}/api/productGroup/updateProductGroup`,
  RemoveProductGroupApi: `${API_URL}/api/productGroup/removeProductGroup`,

  //Product Service Apis
  CreateProductServiceApi: `${API_URL}/api/productService/createProductService`,
  GetProductServiceApi: `${API_URL}/api/productService/getProductService`,
  GetProductServicesApi: `${API_URL}/api/productService/getProductServices`,
  UpdateProductServiceApi: `${API_URL}/api/productService/updateProductService`,
  RemoveProductServiceApi: `${API_URL}/api/productService/removeProductService`,

  //Create of Account Apis
  CreateChartOfAccountApi: `${API_URL}/api/chartOfAccount/createChartOfAccount`,
  GetChartOfAccountApi: `${API_URL}/api/chartOfAccount/getChartOfAccount`,
  GetChartOfAccountsApi: `${API_URL}/api/chartOfAccount/getChartOfAccounts`,
  UpdateChartOfAccountApi: `${API_URL}/api/chartOfAccount/updateChartOfAccount`,
  RemoveChartOfAccountApi: `${API_URL}/api/chartOfAccount/removeChartOfAccount`,

  //Create of User Log Apis
  CreateUserLogApi: `${API_URL}/api/userLog/createUserLog`,
  GetUserLogApi: `${API_URL}/api/userLog/getUserLog`,
  GetUserLogsApi: `${API_URL}/api/userLog/getUserLogs`,
  UpdateUserLogApi: `${API_URL}/api/userLog/updateUserLog`,
  RemoveUserLogApi: `${API_URL}/api/userLog/removeUserLog`,

  //Create of Bank Apis
  CreateBankApi: `${API_URL}/api/bank/createBank`,
  GetBankApi: `${API_URL}/api/bank/getBank`,
  GetBanksApi: `${API_URL}/api/bank/getBanks`,
  UpdateBankApi: `${API_URL}/api/bank/updateBank`,
  RemoveBankApi: `${API_URL}/api/bank/removeBank`,

  //File Apis
  UploadFileApi: `${API_URL}/api/file/uploadFile`,
}
export { API_URL, Apis, Menus, productTypes }