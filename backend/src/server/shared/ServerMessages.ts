export const serverMessages = {
  config: {
    multer: {
      default: '',
      incompatibleImageType: 'Image type not compatible',
    },
    socketio: {
      default: '',
      noSecretKey: '[SocketConfig] No SECRET_KEY found in this enviroment'
    }
  },
  controllers: {
    home: {
      default: 'WhyApp - Your secure and efficient comunication app',
    },
    chats: {
      create: {
        default: '',
        noChatName: 'You need to send chatName',
      }
    },
    login: {
      log_in: {
        default: 'Logged in successfully',
        noEmailOrPassword: 'You must send EMAIL and PASSWORD',
        noUserByEmailOrUndefined: 'Impossible to get user data.',
        incorrectEmailOrPassword: 'Incorrect email or password. Please, try again!',
      },
      log_out: {
        default: 'Logged Out successfuly',
        incorrectTokenFormat: 'Incorrect token format',
        emptyOrUndefinedTokenPosition: 'Token position returned empty',
      },
      register: {
        default: 'New user created successfully',
        noNameEmailOrPassword: 'You must send NAME, EMAIL and PASSWORD',
      },
    },
    users: {
      get_by_id: {
        default: '',
        noUserId: 'You must send the uuid',
        noUserForUserId: 'No user found for the uuid'
      },
      send_private_message: {
        default: '',
        noFromToOrChatIds: 'You need to send both \'from\' and \'to\' UUID\'s, and \'chatId\'',
        sameFromToIds: 'fromUuid and toUuid cannot be the same',
        noMessageInput: 'You need to send a message input'
      },
      update_by_id: {
        default: '',
        noUserId: 'uuid is required'
      },
      upload_profile_image: {
        default: '',
        noFile: 'No file was sent'
      },
    },
  },
  shared: {
    middlewares: {
      api_key_detect: {
        default: '',
        noKeySent: 'You need your credentials to access this API. Contact the owner',
        noKeysFoundOnSystem: 'An error occured when processing your crendentials',
        invalidKey: 'UNAUTHORIZED: invalid or expired API_KEY'
      },
      verify_token: {
        default: '',
        noToken: 'No authorization token found',
        expiredToken: 'Expired Token. Please log in',
        undefinedOrNullDecode: 'Something went wrong'
      },
    },
    services: {
      websockets: {
        home: {
          default: '',
        },
        user: {
          default: '',
        },
      },
      bcrypt: {
        default: '',
        couldntHash: 'An error occured during hashing data',
        couldntCompare: 'An error occured during comparing data',
      },
      jwt: {
        default: '',
        couldntGenerate: 'An error ocurred during token generation',
        noSecretKey: 'There is no secret key',
        incorrectTokenFormat: 'Incorrect token format',
        invalidToken: 'Invalid token'
      },
    },
  },
};