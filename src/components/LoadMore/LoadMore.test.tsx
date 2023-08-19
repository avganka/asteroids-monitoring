import {render, act} from '@testing-library/react';
import {fetchAsteroidsList} from '@/api';
import {useInView} from 'react-intersection-observer';
import LoadMore from './LoadMore';
import '@testing-library/jest-dom';

jest.mock('../../api.ts');
jest.mock('react-intersection-observer');

describe('LoadMore component', () => {
  const mockAsteroidsData = {
    near_earth_objects: {
      '2023-08-18': [
        {
          links: {
            self: 'http://api.nasa.gov/neo/rest/v1/neo/2152563',
          },
          id: '2152563',
          neo_reference_id: '2152563',
          name: '152563 (1992 BF)',
          nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2152563',
          absolute_magnitude_h: 19.81,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min: 0.2901048414,
              estimated_diameter_max: 0.648694146,
            },
            meters: {
              estimated_diameter_min: 290.1048414281,
              estimated_diameter_max: 648.694146035,
            },
            miles: {
              estimated_diameter_min: 0.1802627354,
              estimated_diameter_max: 0.4030797302,
            },
            feet: {
              estimated_diameter_min: 951.7875679509,
              estimated_diameter_max: 2128.2617020774,
            },
          },
          is_potentially_hazardous_asteroid: false,
          close_approach_data: [
            {
              close_approach_date: '2023-08-18',
              close_approach_date_full: '2023-Aug-18 20:04',
              epoch_date_close_approach: 1692389040000,
              relative_velocity: {
                kilometers_per_second: '11.3663001979',
                kilometers_per_hour: '40918.6807122708',
                miles_per_hour: '25425.2769125774',
              },
              miss_distance: {
                astronomical: '0.3281621012',
                lunar: '127.6550573668',
                kilometers: '49092351.354244444',
                miles: '30504572.6156995672',
              },
              orbiting_body: 'Earth',
            },
          ],
          is_sentry_object: false,
        },
      ],
    },
  };

  beforeEach(() => {
    (fetchAsteroidsList as jest.Mock).mockResolvedValue(mockAsteroidsData);
    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });
  });

  it('renders without crashing', () => {
    render(<LoadMore />);
  });

  it('loads more asteroids when spinner comes into view', async () => {
    (useInView as jest.Mock).mockReturnValueOnce({
      ref: jest.fn(),
      inView: true,
    });

    await act(async () => {
      render(<LoadMore />);
    });
    expect(fetchAsteroidsList).toHaveBeenCalled();
  });

  it('renders asteroids correctly', async () => {
    (useInView as jest.Mock).mockReturnValueOnce({
      ref: jest.fn(),
      inView: true,
    });

    const {getByText} = await act(async () => {
      return render(<LoadMore />);
    });
    expect(getByText('1992 BF')).toBeInTheDocument();
  });
});
