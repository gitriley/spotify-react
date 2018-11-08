import * as Spotify from './lib/fetchFromSpotify.js'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import mockSearchResults from '../test_data/searchResults'
import mockTrack from '../test_data/track'
import mockTrackFeatures from '../test_data/trackFeatures'
//import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from 'react-testing-library'

afterEach(() => {
  cleanup()
  Spotify.fetchToken.mockClear()
})

jest.mock('./lib/fetchFromSpotify', () => ({
  fetchToken: jest.fn(() => {
    return {
      token: 777,
      token_age_minutes: 1
    }
  }),
  fetchSearchResults: jest.fn((a, b) => {
    console.log('ran the fetchSearchResults mock', a, b)
    return mockSearchResults
  }),
  fetchTrack: jest.fn((a, b) => {
    console.log('ran the fetchTrack mock', a, b)
    return mockTrack
  }),
  fetchTrackFeatures: jest.fn((a, b) => {
    console.log('ran the fetchTrackFeatures mock', a, b)
    return mockTrackFeatures
  })
}))


const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve))
}



it('renders without crashing', async () => {
  spyOn(App.prototype, 'updateToken')
  const div = document.createElement('div')
  await ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})


test('<App /> calls updateToken() upon initialization', () => {
  spyOn(App.prototype, 'updateToken').and.callThrough()
  const wrapper = render(<App />)
  expect(Spotify.fetchToken).toHaveBeenCalledTimes(1)

})

test('Initial app-wide integration test', async () => {
  //

  const wrapper = render(<App />)
  await fireEvent.change(wrapper.container.getElementsByClassName('search-input')[0], {
    target: { value: 'saba' },
  })
  fireEvent.click(wrapper.container.getElementsByClassName('search-button-icon')[0])
  await flushPromises()
  expect(Spotify.fetchSearchResults).toHaveBeenCalledTimes(1)
  expect(Spotify.fetchSearchResults).toHaveBeenCalledWith('saba', 777)
  expect(wrapper.container.getElementsByClassName('track-wrapper').length).toEqual(20)

  // make sure each search result was actually rendered with the correct text
  mockSearchResults.tracks.items.forEach((track) => {
    const element = wrapper.getByText(track.name)
    expect(element).toBeTruthy()

    // basically a tautology, but just double checking
    expect(element.innerHTML).toBe(track.name)
  });

  fireEvent.click(wrapper.getByText('Ace'))

  await flushPromises()
  //wrapper.debug()

  // test <TrackImage> component
  expect(wrapper.getByTestId('track-image').src).toEqual(mockTrack.album.images[1].url)

  // test <Header> Component
  expect(wrapper.getByTestId('main__track-title').innerHTML).toEqual('Ace')
  expect(wrapper.getAllByTestId('main__track-artist').length).toEqual(3)
  expect(wrapper.getAllByTestId('main__track-artist')[0].innerHTML).toEqual(' Noname ')
  expect(wrapper.getAllByTestId('main__track-artist')[1].innerHTML).toEqual(' • Smino ')
  expect(wrapper.getAllByTestId('main__track-artist')[2].innerHTML).toEqual(' • Saba ')

  // test that audio player loads
  expect(wrapper.queryByTestId('footer')).toBeNull()
  fireEvent.click(wrapper.getByText('Load track in audio player'))
  expect(wrapper.getByTestId('footer')).toBeTruthy()
  expect(wrapper.getByTestId('audio-player').src).toEqual('https://open.spotify.com/embed?uri=spotify:track:' + mockTrack.id + '&theme=white')


  // test that track features have the correct values
  expect(wrapper.getByTestId('acousticness-value').innerHTML).toEqual('0.86')
  expect(wrapper.getByTestId('danceability-value').innerHTML).toEqual('0.69')
  expect(wrapper.getByTestId('energy-value').innerHTML).toEqual('0.51')
  expect(wrapper.getByTestId('instrumentalness-value').innerHTML).toEqual('0.00')
  expect(wrapper.getByTestId('liveness-value').innerHTML).toEqual('0.12')
  expect(wrapper.getByTestId('speechiness-value').innerHTML).toEqual('0.41')
  expect(wrapper.getByTestId('valence-value').innerHTML).toEqual('0.65')
  expect(wrapper.getByTestId('loudness-value').innerHTML).toEqual('-9.17')
  expect(wrapper.getByTestId('tempo-value').innerHTML).toEqual('106.89')


  // test that track feature bar graphs have the correct width
  expect(wrapper.getByTestId('acousticness-bar').style.width).toEqual('86.5%')
  expect(wrapper.getByTestId('loudness-bar').style.width).toEqual('73.79%')
  expect(wrapper.getByTestId('tempo-bar').style.width).toEqual('48.59%')

  expect(wrapper.getByTestId('key-text').innerHTML).toEqual('A♯/B♭')
  expect(wrapper.getByTestId('time_signature-text').innerHTML).toEqual('4/4')
  expect(wrapper.getByTestId('mode-text').innerHTML).toEqual('Major')

  // test finding similar tracks

  //fireEvent.click(wrapper.getByText('Find Similar Tracks'))


});


