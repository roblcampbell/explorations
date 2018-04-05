# MockResources
These files are mocks used when you run the server with the protractor environment set, like so: `ng serve -e=protractor`.

When the `protractor` environment is active, the application will receive a number of empty Blob objects from the mock's API when you hit the Scan button. This is not necessary now.

You can simulate failed scans under various circumstances using protractor's `browser.executeScript`:

- No Route To Web API: `TODO: coming soon`
