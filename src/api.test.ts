import axios from 'axios';
import {fetchAsteroid, fetchAsteroidsList} from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NASA API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches asteroids list correctly', async () => {
    const mockData = {data: 'some data'};
    mockedAxios.get.mockResolvedValueOnce(mockData);

    const result = await fetchAsteroidsList();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.nasa.gov/neo/rest/v1/feed',
      expect.objectContaining({
        params: expect.any(URLSearchParams),
      })
    );
    expect(result).toEqual(mockData.data);
  });

  it('fetches asteroid correctly', async () => {
    const mockData = {data: 'asteroid'};
    const asteroidId = '1';
    mockedAxios.get.mockResolvedValueOnce(mockData);

    const result = await fetchAsteroid(asteroidId);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}`,
      expect.objectContaining({
        params: expect.any(URLSearchParams),
      })
    );
    expect(result).toEqual(mockData.data);
  });
});
