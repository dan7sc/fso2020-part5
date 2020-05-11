describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    const anotherUser = {
      name: 'Arto Hellas',
      username: 'hellas',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', anotherUser)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpass')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/'
      }

      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()

      cy.contains(blog.title)
      cy.contains(blog.author)
      cy.contains(blog.url)

      cy.get('.success')
        .should('contain', `a new blog ${blog.title} by ${blog.author} added`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        const blog = {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
        cy.createBlog(blog)
      })

      it('It can be liked', function() {
        cy.get('.view-button').click()
        cy.get('.like-button').click()

        cy.contains('likes 1')
      })
    })
  })

  describe('Logged user', function() {
    beforeEach(function() {
      const blog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
      }
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog(blog)
    })

    describe('Who created a blog', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('Can delete it', function() {
        cy.get('.view-button').click()
        cy.get('#delete-blog-button').click()
        cy.contains('remove')
        cy.contains('First class tests').not()
        cy.contains('Robert C. Martin').not()
        cy.contains('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html').not()
      })
    })

    describe('Who not created a blog', function() {
      beforeEach(function() {
        cy.login({ username: 'hellas', password: 'salainen' })
      })

      it('Cannot delete it', function() {
        cy.get('.view-button').click()
        cy.get('button').not('#delete-blog-button')
      })
    })
  })

  describe.only('blogs are ordered', function() {
    let blogsByNumberOfLikesDesc

    beforeEach(function() {
      const blogs = [
        {
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 2
        },
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 8
        },
        {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 5
        },
        {
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
          likes: 11
        },
      ]

      blogsByNumberOfLikesDesc = Array.from(blogs)
      blogsByNumberOfLikesDesc.sort((currentBlog, previousBlog) => {
        return previousBlog.likes - currentBlog.likes
      })

      cy.login({ username: 'mluukkai', password: 'salainen' })
      blogs.forEach(blog => {
        cy.createBlog(blog)
      })
    })

    it('with the most likes being first', function() {
      cy.get('.all-items').each((item, index) => {
        cy.get(item).contains(`likes ${blogsByNumberOfLikesDesc[index].likes}`)
      })
    })
  })
})
