// @flow
/**
 * some example of API
 */
import apisauce from 'apisauce';

const create = (token) => {
  const idApi = apisauce.create({baseURL: 'https://dev/'});

  const appApi = apisauce.create({
    baseURL: 'https://dev/api',
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  const appApiGw = apisauce.create({
    baseURL: 'https://dev/v0',
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  const psApi = apisauce.create({
    baseURL: 'https://dev/api',
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  const msgApi = apisauce.create({
    baseURL: 'https://dev/api',
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  // Identity
  const login = (data) => idApi.post('/token/', data);
  const logout = () => idApi.delete('/token/', {}, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  const me = (token) => idApi.get('/me/', {}, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  const overview = () => appApi.get('/overview/');
  const api1 = () => appApi.get('/api1/');

  const api2 = (params) => appApiGw.get('/api2/', params);

  // Profile
  const profile = (id) => psApi.get(`/api2/${id}/`);

  // Messaging
  const getThreads = (objId) => msgApi.get(`/${objId}/threads/`);
  const createThread = (objId, data) =>
  msgApi.post(`/${objId}/threads/`, data);
  const getMessages = (objId, thread_id) => msgApi.get(`/${objId}/threads/${thread_id}/messages/`);

  return {
    login,
    logout,
    me,
    overview,
    api1,
    profile,
    api2,
    getThreads,
    createThread,
    getMessages
  };
};

export default {
  create
};
