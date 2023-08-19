import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Asteroid from './Asteroid';
import '@testing-library/jest-dom';

describe('Asteroid component', () => {
  const mockAsteroid = {
    links: {
      self: 'http://api.nasa.gov/neo/rest/v1/neo/2152563',
    },
    id: '2152563',
    neo_reference_id: '2152563',
    name: '(2006 GB)',
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
  };

  it('renders without crashing', () => {
    render(<Asteroid asteroid={mockAsteroid} />);
    expect(screen.getByText('2006 GB')).toBeInTheDocument();
  });

  it('toggles the asteroid in the cart on order button click', () => {
    render(<Asteroid asteroid={mockAsteroid} />);
    const orderButton = screen.getByText('Заказать');
    fireEvent.click(orderButton);
    expect(screen.getByText('В корзине')).toBeInTheDocument();
  });

  it('displays the correct asteroid size image based on diameter', () => {
    render(<Asteroid asteroid={mockAsteroid} />);
    const asteroidImage = screen.getByAltText('Большой астероид');
    expect(asteroidImage).toBeInTheDocument();
  });

  it('displays the danger icon and label for hazardous asteroids', () => {
    mockAsteroid.is_potentially_hazardous_asteroid = true;
    render(<Asteroid asteroid={mockAsteroid} />);
    const dangerIcon = screen.getByAltText('Опасно');
    expect(dangerIcon).toBeInTheDocument();
    expect(screen.getByText('Опасен')).toBeInTheDocument();
  });
});
