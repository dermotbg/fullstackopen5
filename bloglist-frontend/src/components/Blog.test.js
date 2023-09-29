import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

beforeEach(() => {
  window.localStorage.setItem(
    'loggedInAppUser',
    '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfdXNlciIsImlkIjoiNjUwZDU2MjQwOGRmOWVmMDVmMTRmODk1IiwiaWF0IjoxNjk1ODc1MDQ5LCJleHAiOjE2OTU4Nzg2NDl9.PVr94illz2M3ua9GSQbVz3DFIFXYE8aq26C9HxZUZro","username":"test_user","name":"Test username"}'
  )
  const blog = {
    title: 'created in test',
    author: 'Tim Tester',
    likes: 10,
    url: 'www.shouldnotshow.com',
    user: {
      username: 'test_user',
      name: 'Test Username',
      id: '650d562408df9ef05f14f895'
    }
  }
  const mockHandler = jest.fn()
})


test('renders title/author, but not URL/likes', (blog, mockHandler) => {
  // const blog = {
  //   title: 'created in test',
  //   author: 'Tim Tester',
  //   likes: 10,
  //   url: 'www.shouldnotshow.com',
  //   user: {
  //     username: 'test_user',
  //     name: 'Test Username',
  //     id: '650d562408df9ef05f14f895'
  //   }
  // }
  // const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} updateBlogs={mockHandler} />)
  const title = container.querySelector('.title')

  expect(title).toHaveTextContent('created in test')
  expect(title).toHaveTextContent('Tim Tester')

  const extraInfo = container.querySelector('.extraInfo')

  expect(extraInfo).toHaveStyle('display: none')

})

// test('URL & likes shown after view button clicked', async () => {
//   const { container } = render(<Blog blog={blog} updateBlogs={mockHandler} />)
// })

afterEach(() => {
  window.localStorage.clear()
})