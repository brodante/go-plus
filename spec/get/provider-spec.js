'use babel'
/* eslint-env jasmine */

describe('go-get service provider', () => {
  let mainModule = null

  beforeEach(() => {
    let pack = atom.packages.loadPackage('go-plus')
    pack.activateNow()
    mainModule = pack.mainModule

    waitsFor(() => {
      return mainModule.getGoconfig()
    })

    waitsFor(() => {
      return mainModule.getGetManager()
    })
  })

  describe('the provider', () => {
    it('is truthy', () => {
      expect(mainModule.provideGoGet).toBeDefined()
      expect(mainModule.provideGoGet()).toBeTruthy()
    })
  })

  describe('the 2.0.0 provider', () => {
    it('is truthy', () => {
      expect(mainModule.provideGoGet).toBeDefined()
      expect(mainModule.provideGoGet()).toBeTruthy()
    })

    it('has a get function', () => {
      expect(mainModule.provideGoGet().get).toBeDefined()
    })

    it('has a register function', () => {
      expect(mainModule.provideGoGet().register).toBeDefined()
    })

    describe('register()', () => {
      let manager
      let provider
      beforeEach(() => {
        manager = mainModule.getGetManager()
        provider = mainModule.provideGoGet()
        expect(manager).toBeTruthy()
        expect(manager.packages).toBeTruthy()
        expect(manager.packages.size).toBe(0)
      })

      it('registers a package', () => {
        provider.register('github.com/nsf/gocode')
        expect(manager.packages.size).toBe(1)
        provider.register('github.com/nsf/gocode')
        expect(manager.packages.size).toBe(1)
      })

      it('registers the same package multiple times', () => {
        provider.register('github.com/nsf/gocode')
        expect(manager.packages.size).toBe(1)
        provider.register('github.com/nsf/gocode')
        expect(manager.packages.size).toBe(1)
        provider.register('github.com/nsf/gocode')
        expect(manager.packages.size).toBe(1)
      })

      it('allows a package registration to be disposed', () => {
        let registration = provider.register('github.com/nsf/gocode')
        expect(registration).toBeTruthy()
        expect(registration.dispose).toBeDefined()
        expect(manager.packages.size).toBe(1)
        registration.dispose()
        expect(manager.packages.size).toBe(0)
      })

      it('dispose is aware of the number of package registrations', () => {
        let registration1 = provider.register('github.com/nsf/gocode')
        expect(registration1).toBeTruthy()
        expect(registration1.dispose).toBeDefined()
        expect(manager.packages.size).toBe(1)
        let registration2 = provider.register('github.com/nsf/gocode')
        expect(registration2).toBeTruthy()
        expect(registration2.dispose).toBeDefined()
        expect(manager.packages.size).toBe(1)
        registration1.dispose()
        expect(manager.packages.size).toBe(1)
        registration2.dispose()
        expect(manager.packages.size).toBe(0)
        registration1.dispose()
        registration2.dispose()
        expect(manager.packages.size).toBe(0)
      })
    })
  })

  describe('the 1.0.0 provider', () => {
    it('is truthy', () => {
      expect(mainModule.provideGoGet100).toBeDefined()
      expect(mainModule.provideGoGet100()).toBeTruthy()
    })

    it('has a get function', () => {
      expect(mainModule.provideGoGet100().get).toBeDefined()
    })

    it('has a check function', () => {
      expect(mainModule.provideGoGet100().check).toBeDefined()
    })

    it('does not have a register function', () => {
      expect(mainModule.provideGoGet100().register).not.toBeDefined()
    })
  })
})
