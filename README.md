# aws-commands

An unofficial node.js command line wrapper around my commonly used AWS commands. Right now it is mostly focused on wrapping my common Elasticsearch interactions, but will be expanded in the future.

## Installation

The recommended way to install the project is globally. To do so, simply run `npm i -g aws-commands`. This opens the `awsCommands` command to you.

## Usage

Like the official AWS commandline tool, this tool separates commands you can run into separate services. The way this looks is `awsCommands <service> <command>`.

At any point in that path, you can add the `--help` flag to show all of the options. This means you can run `awsCommands --help` to show you all of the services available, `awsCommands <service> --help` to show all of the commands for a specified service, and `awsCommands <service> <command> --help` to show all of the options for a specified command.

## Services

The following services, and the commands underneath them are supported at this time.

### Service: AWS Elasticsearch

This service is the primary reason for creating this tool. While the official AWS cli allows one to manange the Elasticsearch cluster, it does not allow you to easily run queries against the data on the cluster. The implementation of this service combines both, allowing cluster management while also allowing various queries to be run without having to remember the specific endpoints to hit.

#### Command: Get Mapping

```bash
awsCommands es get-mapping --endpoint <endpoint> --index <index>
```

This command makes a call to the specified elasticsearch endpoint and index, and prints to the console what the current mapping of that index is.

#### Command: List Aliases

```bash
awsCommands es list-aliases --endpoint <endpoint>
```

This command makes a call to the specified elasticsearch endpoint and prints to the console a list of the aliases that exist for the domain.

#### Command: List Endpoints

```bash
awsCommands es list-endpoints
```

This command uses your current AWS Credentials file to list all of the elasticsearch endpoints that exist for the default profile.

#### Command: List Indices

```bash
awsCommands es list-indices --endpoint <endpoint>
```

This command makes a request to the passed in endpoint and returns a list of all indices that exist on the domain.

#### Command: Update Mapping

```bash
awsCommands es update-mapping --endpoint <endpoint> --index <index> --mappingFile <path/to/mapping/file.json>
```

This command makes an update to the specified endpoint and index to add new fields to the document mapping that exists for that endpoint. The `mappingFile` argument must be a json file that conforms to the specification outlined on the [Put mapping API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html) page.

### Service: AWS SQS

#### Command: Move

```bash
awsCommands sqs move --from <queueUrl> --to <queueUrl>
```

This command moves messages from one queue to another