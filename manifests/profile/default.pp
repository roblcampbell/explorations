define my_github_repo_name_in_hiera::profile::default (
  $consul_config_hash,
  $consul_tags,
  $resource_path,
) {

  $deployment = $::environment

  if !defined(Class['nginx']) {
    class { 'nginx': }
  }

  if !defined(Class['drc_consul_agent::agent']) {
    class { 'drc_consul_agent::agent':
      consul_config_hash => $consul_config_hash
    }
  }

  if !defined(Exec['consul reload']) and $consul_tags != undef {
    exec { 'consul reload':
      command     => 'consul reload',
      path        => '/usr/local/bin',
      refreshonly => true,
    }
  }

  if !defined(File['consul config']) and $consul_tags != undef {
    file {
      'consul config':
        path    => '/etc/consul/my_github_repo_name_in_hiera.json',
        ensure  => 'present',
        owner   => 'root',
        group   => 'root',
        mode    => '0644',
        notify  => Exec['consul reload'],
        content => template('my_github_repo_name_in_hiera/consul_config.json.erb'),
    }
  }

  include '::archive'

  if !defined(Exec['nginx reload']) {
    exec { 'nginx reload':
      command     => 'nginx -s reload',
      path        => '/usr/sbin',
      refreshonly => true,
    }
  }

  if !defined(File['nginx default']) {
    file {
      'nginx default':
        path    => '/etc/nginx/conf.d/default.conf',
        ensure  => 'present',
        owner   => 'root',
        group   => 'root',
        mode    => '0644',
        require => Class['nginx'],
        notify  => Exec['nginx reload'],
        content => template('my_github_repo_name_in_hiera/default.conf.erb'),
    }
  }
}
