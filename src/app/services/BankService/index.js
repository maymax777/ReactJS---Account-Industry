import api from '../../../app/ApiConfig'
import { Apis } from "../../../config";
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
const getDebit = (id) => {
  return {
    tr_Id: id,
    trans_Id: 1,
    ledger_Code: 1,
    debit: (Math.random() * 1000).toFixed(2),
    credit: 0,
    gi_type: "gi_type",
    remarks: 'remarks',
    narration: 'naration',
    status: true,
    vouc_No: "3",
    fiscal: '1',
    date: '2019-11-8',
    tran_type: 'tran_type',
    branch_id: 1,
    project_id: 1
  }
}
const getCredit = (id) => {
  let debit = getDebit(id);
  debit.debit = 0;
  debit.credit = Math.random() * 1000;
  return debit;
}
const getBanks = async () => {
  try {
    let result = await api.post(Apis.GetBanksApi);
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
const getBank = async () => {
  try {
    let result = await api.post(Apis.GetBankApi);
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
const createBank = async data => {
  try {
    let result = await api.post(Apis.CreateBankApi, data);
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
const updateBank = async data => {
  try {
    let result = await api.post(Apis.UpdateBankApi, data);
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
const remvoeBank = async id => {
  try {
    let result = await api.post(Apis.RemoveBankApi, { id });
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
const createTransaction = async data => {
  data.tr_Id = moment().millisecond();
  data.trans_Id = moment().millisecond();
  return data;
}
const getTransactions = async type => {
  const length = 25;
  let data = [];
  for (let i = 0; i < length; i++) {
    (type === 'debit') ? data.push(getDebit(i)) : data.push(getCredit(i));
  }
  return data;
}
export default {
  getBank,
  getBanks,
  createBank,
  updateBank,
  remvoeBank,

  createTransaction,
  getTransactions
}