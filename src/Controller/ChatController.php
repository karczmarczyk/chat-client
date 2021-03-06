<?php
namespace App\Controller;

use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ChatController extends AbstractController
{
    /**
     * @Route("/", name="app_main")
     * @Route("/index", name="chatIndexAction")
     */
    public function indexAction ()
    {
        return $this->render('chat/index.html.twig');
    }

    /**
     * @Route("/chat-channel/{memberId}", name="chatChannelAction")
     * @param $memberId
     * @param UserRepository $userRepository
     * @return Response
     */
    public function channelAction ($memberId, UserRepository $userRepository)
    {
        $user = $this->getUser();
        $member = $userRepository->find($memberId);

        return $this->render('chat/channel.html.twig',[
            'member' => $member,
            'user' => $user
        ]);
    }

    /**
     * @Route("/chat-messages/{memberId}", name="chatMessagesAction")
     *
     * @param UserRepository $userRepository
     * @param MessageRepository $messageRepository
     * @param $memberId
     * @return mixed
     */
    public function messagesAction (UserRepository $userRepository, MessageRepository $messageRepository, $memberId) {
        $fromUser = $this->getUser();
        $toUser = $userRepository->find($memberId);

        $messages = $messageRepository->findConversation($fromUser, $toUser);

        return $this->json(['messages' => array_reverse($messages)]);
    }

    /**
     * @Route("/chat-channels", name="chatChannelsAction")
     * @param Request $request
     * @param UrlGeneratorInterface $router
     * @param UserRepository $userRepository
     * @return Response
     */
    public function channelsAction (Request $request, UrlGeneratorInterface $router, UserRepository $userRepository)
    {
        $members = $userRepository->findAllMembersExceptMe();
        $current = $request->get('current');
        $currentMemberId = $request->get('currentMemberId');
        $menu = [];

        foreach ($members as $member) {
            $menu[] =
                ['label'=>$member->getUserName(),
                    'href'=>$router->generate('chatChannelAction', ['memberId'=>$member->getId()]),
                    'isActive'=> $current=='chatChannelAction' && $currentMemberId==$member->getId()
                ];
        }

        return $this->render('layout/main_menu.html.twig', [
            'menu' => $menu
        ]);
    }
}