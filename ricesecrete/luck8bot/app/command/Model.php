<?php

namespace app\command;

use app\common\DbTool;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand('model', 'model')]
class Model extends Command
{
    /**
     * @return void
     */
    protected function configure()
    {
        //配置参数 php webman model -t type
        $this->addOption('type', 't', InputOption::VALUE_REQUIRED, 'Type to process');
        $this->addOption('path', 'p', InputOption::VALUE_OPTIONAL, 'Path to process');
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $type = $input->getOption('type');
        $path = $input->getOption('path');
        $app_path = app_path();
        if (!empty($path)) {
            //  app/pay/model/PaymentModel.php
            $file = $path . '.php';
            if ($file == '.' || $file == '..' || $file == 'Base.php' || strrpos($file, '.php') == false) {
                return Command::SUCCESS;
            }
            // 获取 app/pay/model/PaymentModel.php 的PaymentModel
            $modelNameFile = substr(strrchr($file, '/'), 1);
            $namespace = "app" . '\\' . str_replace('/', '\\', rtrim($file, '/')) . '\\';
            $namespace = str_replace("\\" . $modelNameFile, '', $namespace);
            $namespace = str_replace($modelNameFile, '', $namespace);
            if (empty($namespace)) {
                return Command::SUCCESS;
            }
            if (file_exists($app_path . "/" . $file)) {
                $modelName = str_replace('.php', '', $modelNameFile);
                print_r($modelName . "\n");
                print_r($namespace . "\n");
                $obj_file = $namespace . $modelName;
                print_r($obj_file . "\n");
                if ($type == 'table') {
                    //判断 createTable存在
                    if (!method_exists($obj_file, 'createTable')) {
                        print_r($modelName . " createTable not exists" . "\n");
                        return Command::SUCCESS;
                    }
                    $obj_file::createTable($namespace, $modelName);
                }
                if ($type == 'sequence') {
                    //判断 createSequence存在
                    if (!method_exists($obj_file, 'createSequence')) {
                        print_r($modelName . " createSequence not exists" . "\n");
                        return Command::SUCCESS;
                    }
                    $obj_file::createSequence($namespace, $modelName);
                }
            }
            return Command::SUCCESS;
        }
        $path_arr = [
            $app_path . "/common/model/"
        ];
        // $type==table 创建表 $type==sequence 创建序列
        //读取文件夹下面的文件列表
        foreach ($path_arr as $path) {
            $files = scandir($path);
            foreach ($files as $file) {
                if ($file == '.' || $file == '..' || $file == 'Base.php' || strrpos($file, '.php') == false) {
                    continue;
                }
                $app_part = 'app/';
                $pos = strpos($path, $app_part);
                $namespace = '';
                if ($pos !== false) {
                    $relative_path = substr($path, $pos + strlen($app_part));
                    $namespace = "app" . '\\' . str_replace('/', '\\', rtrim($relative_path, '/')) . '\\';
                }
                if (empty($namespace)) {
                    continue;
                }
                if (file_exists($path . $file)) {
                    $modelName = str_replace('.php', '', $file);
                    print_r($modelName . "\n");
                    print_r($namespace . "\n");
                    $obj_file = $namespace . $modelName;
                    print_r($obj_file . "\n");
                    if ($type == 'table') {
                        //判断 createTable存在
                        if (!method_exists($obj_file, 'createTable')) {
                            print_r($modelName . " createTable not exists" . "\n");
                            continue;
                        }
                        $obj_file::createTable($namespace, $modelName);
                    }
                    if ($type == 'sequence') {
                        //判断 createSequence存在
                        if (!method_exists($obj_file, 'createSequence')) {
                            print_r($modelName . " createSequence not exists" . "\n");
                            continue;
                        }
                        $obj_file::createSequence($namespace, $modelName);
                    }
                }
            }
        }
        return Command::SUCCESS;
    }

}
