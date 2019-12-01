import api from '../../../app/ApiConfig'
import { Apis } from "../../../config";
import { NotificationManager } from 'react-notifications';

const getChartOfAccounts = async () => {
  try {
    let result = await api.post(Apis.GetChartOfAccountsApi);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return [];
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
const getChartOfAccount = async () => {
  try {
    let result = await api.post(Apis.GetChartOfAccountApi);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const createChartOfAccount = async data => {
  try {
    let result = await api.post(Apis.CreateChartOfAccountApi, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const updateChartOfAccount = async data => {
  try {
    let result = await api.post(Apis.UpdateChartOfAccountApi, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
const remvoeChartOfAccount = async id => {
  try {
    let result = await api.post(Apis.RemoveChartOfAccountApi, {id});
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return false;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export default {
  getChartOfAccount,
  getChartOfAccounts,
  createChartOfAccount,
  updateChartOfAccount,
  remvoeChartOfAccount
}