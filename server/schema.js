const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql/type')

const data = require('./data')

const LeafType = new GraphQLObjectType({
  name: 'LeafType',
  fields: {
    leafType: {
      type: GraphQLString,
      resolve (parent) {
        return parent.leafType
      }
    },
    leafID: {
      type: GraphQLString,
      resolve (parent) {
        return parent.leafID
      }
    },
    leafData: {
      type: GraphQLString,
      resolve (parent) {
        return parent.leafData
      }
    }
  }
})

const LeafletType = new GraphQLObjectType({
  name: 'LeafletType',
  fields: {
    title: {
      type: GraphQLString,
      resolve (parent) {
        return parent.title
      }
    },
    leaves: {
      type: new GraphQLList(LeafType),
      resolve (parent) {
        return parent.leaves
      }
    }
  }
})

const SectionType = new GraphQLObjectType({
  name: 'SectionType',
  fields: {
    title: {
      type: GraphQLString,
      resolve (parent) {
        return parent.title
      }
    },
    leaflets: {
      type: new GraphQLList(LeafletType),
      resolve (parent) {
        return parent.pages
      }
    }
  }
})

const NotebookType = new GraphQLObjectType({
  name: 'NotebookType',
  fields: {
    title: {
      type: GraphQLString,
      resolve (parent) {
        return parent.title
      }
    },
    color: {
      type: GraphQLString,
      resolve (parent) {
        return parent.color
      }
    },
    sections: {
      type: new GraphQLList(SectionType),
      resolve (parent) {
        return parent.sections
      }
    }
  }
})

const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    },
    notebooks: {
      type: new GraphQLList(NotebookType)
    }
  }
})

const RootType = new GraphQLObjectType({
  name: 'RootType',
  fields: {
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve () {
        return data
      }
    },
    profile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        },
        username: {
          type: GraphQLString
        }
      },
      resolve (parent, { id, username }) {
        return data[id]
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootType
})

module.exports = schema
